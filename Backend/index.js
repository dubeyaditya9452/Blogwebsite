const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./models/User')

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/blogwebsite')
.then(() => {
    console.log('Connected to MongoDB')
})
.catch((err) => {
    console.log('MongoDB Connection Error:', err)
})

// Authentication Routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password } = req.body
        
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        // Save user
        const savedUser = await newUser.save()
        const { password: _, ...userData } = savedUser._doc

        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body

        // Find user
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" })
        }

        // Create token
        const token = jwt.sign({ id: user._id }, "your-secret-key", { expiresIn: "3d" })

        const { password: _, ...userData } = user._doc

        res.status(200).json({ ...userData, token })
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}) 