import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError("")
      
      // Validate inputs
      if (!username || !email || !password) {
        setError("Please fill in all fields")
        return
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address")
        return
      }

      // Validate password length
      if (password.length < 6) {
        setError("Password must be at least 6 characters long")
        return
      }

      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password
      })

      if (response && response.data) {
        // Registration successful, redirect to login
        navigate("/login")
      } else {
        setError("Something went wrong. Please try again.")
      }
    }
    catch (err) {
      console.error("Registration error:", err)
      setError(err?.response?.data?.message || "An error occurred during registration")
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[80%] md:w-[25%] bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-8">Register to Blogspherse</h1>
        <form className="flex flex-col space-y-4" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
            minLength={3}
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            minLength={6}
          />
          <button 
            type="submit" 
            className="w-full px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
          {error && (
            <p className="text-red-500 text-center text-sm">
              {error}
            </p>
          )}
          <p className="text-center text-gray-600">
            Already have an account? 
            <Link to="/login" className="text-black font-bold hover:underline ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register