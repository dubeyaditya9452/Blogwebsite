import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError("")
      
      if (!email || !password) {
        setError("Please fill in all fields")
        return
      }

      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      })

      if (response && response.data) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(response.data))
        // Navigate to home page
        navigate("/")
        // Reload page to update navbar
        window.location.reload()
      } else {
        setError("Something went wrong. Please try again.")
      }
    }
    catch (err) {
      console.error("Login error:", err)
      setError(err?.response?.data?.message || "An error occurred during login")
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[80%] md:w-[25%] bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-8">Login to Blogspherse</h1>
        <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
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
          />
          <button 
            type="submit" 
            className="w-full px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && (
            <p className="text-red-500 text-center text-sm">
              {error}
            </p>
          )}
          <p className="text-center text-gray-600">
            Don't have an account? 
            <Link to="/register" className="text-black font-bold hover:underline ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login