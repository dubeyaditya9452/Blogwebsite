const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('./models/User')
const postRoute = require('./routes/posts')

dotenv.config()

// Debug environment variables
console.log('Environment check:')
console.log('MONGODB_URI:', process.env.MONGODB_URI)
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET)
console.log('PORT:', process.env.PORT)

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// MongoDB Connection
console.log('Attempting to connect to MongoDB...')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blogwebsite')
.then(() => {
    console.log('Connected to MongoDB successfully')
})
.catch((err) => {
    console.error('MongoDB Connection Error:', err)
})

// Debug middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
})

// Routes
app.use("/api/posts", postRoute)

// Authentication Routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password } = req.body
        console.log('Attempting to register user:', { username, email })
        
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] })
        if (existingUser) {
            console.log('User already exists:', { email, username })
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
        console.log('User registered successfully:', { username, email })
        const { password: _, ...userData } = savedUser._doc

        res.status(200).json(userData)
    } catch (err) {
        console.error('Registration error:', err)
        res.status(500).json({ message: "Server error" })
    }
})

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body
        console.log('Attempting login for:', email)

        // Find user
        const user = await User.findOne({ email })
        if (!user) {
            console.log('User not found:', email)
            return res.status(400).json({ message: "User not found" })
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            console.log('Invalid password for user:', email)
            return res.status(400).json({ message: "Invalid password" })
        }

        // Create token
        const token = jwt.sign(
            { id: user._id, username: user.username }, 
            process.env.JWT_SECRET || "your-secret-key", 
            { expiresIn: "3d" }
        )

        console.log('Login successful for:', email)
        const { password: _, ...userData } = user._doc

        res.status(200).json({ ...userData, token })
    } catch (err) {
        console.error('Login error:', err)
        res.status(500).json({ message: "Server error" })
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}) 