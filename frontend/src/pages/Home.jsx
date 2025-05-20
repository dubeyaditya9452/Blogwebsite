import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaUser, FaClock } from 'react-icons/fa'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Dummy data for initial development
  const dummyPosts = [
    {
      _id: "1",
      title: "Getting Started with React",
      desc: "React is a popular JavaScript library for building user interfaces. In this post, we'll explore the basics of React and how to get started with it.",
      photo: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
      username: "John Doe",
      categories: ["React", "JavaScript"],
      createdAt: "2024-01-15T10:00:00.000Z",
      link: "https://react.dev/learn"
    },
    {
      _id: "2",
      title: "Understanding Node.js and Express",
      desc: "Node.js is a runtime that allows JavaScript to be run outside the browser. Express is a minimal and flexible Node.js web application framework.",
      photo: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop",
      username: "Jane Smith",
      categories: ["Node.js", "Backend"],
      createdAt: "2024-01-14T15:30:00.000Z",
      link: "https://www.tableau.com/learn/articles/blogs-about-machine-learning-artificial-intelligence"
    },
    {
      _id: "3",
      title: "Python for Data Science: A Beginner's Guide",
      desc: "Learn how to use Python for data analysis, visualization, and machine learning. This comprehensive guide covers pandas, numpy, and scikit-learn.",
      photo: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=800&auto=format&fit=crop",
      username: "Sarah Wilson",
      categories: ["Python", "Data Science"],
      createdAt: "2024-01-13T09:15:00.000Z",
      link: "https://www.datacamp.com/blog/python-data-science-guide"
    },
    {
      _id: "4",
      title: "Modern JavaScript: ES6 and Beyond",
      desc: "Explore the modern features of JavaScript including arrow functions, destructuring, async/await, and modules. Level up your JS skills!",
      photo: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&auto=format&fit=crop",
      username: "Mike Johnson",
      categories: ["JavaScript", "Web Development"],
      createdAt: "2024-01-12T14:20:00.000Z",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
    },
    {
      _id: "5",
      title: "Building RESTful APIs with Express",
      desc: "Learn how to create robust and scalable REST APIs using Express.js. Covers routing, middleware, authentication, and best practices.",
      photo: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop",
      username: "Alex Brown",
      categories: ["API", "Backend"],
      createdAt: "2024-01-11T11:45:00.000Z",
      link: "https://expressjs.com/en/guide/routing.html"
    },
    {
      _id: "6",
      title: "TypeScript: The Future of JavaScript",
      desc: "Discover how TypeScript enhances JavaScript development with static typing, interfaces, and advanced object-oriented features.",
      photo: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop",
      username: "Emily Chen",
      categories: ["TypeScript", "JavaScript"],
      createdAt: "2024-01-10T16:30:00.000Z",
      link: "https://www.typescriptlang.org/docs/"
    },
    {
      _id: "7",
      title: "Docker for Developers",
      desc: "Master containerization with Docker. Learn how to create, deploy, and manage containers for your applications.",
      photo: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&auto=format&fit=crop",
      username: "David Lee",
      categories: ["DevOps", "Docker"],
      createdAt: "2024-01-09T13:25:00.000Z",
      link: "https://docs.docker.com/get-started/"
    },
    {
      _id: "8",
      title: "Full-Stack Development with MERN Stack",
      desc: "Build modern web applications using MongoDB, Express, React, and Node.js. A complete guide to full-stack JavaScript development.",
      photo: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&auto=format&fit=crop",
      username: "Rachel Green",
      categories: ["Full-Stack", "MERN"],
      createdAt: "2024-01-08T10:55:00.000Z",
      link: "https://www.mongodb.com/mern-stack"
    }
  ]

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const res = await axios.get('http://localhost:5000/api/posts')
        setPosts(res.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch posts')
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="px-4 md:px-20 py-8">
      {/* Featured Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <Link to={`/post/${post._id}`} key={post._id} className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={post.photo} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {post.categories && post.categories.length > 0 && (
                    <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white text-sm px-3 py-1 rounded-full">
                      {post.categories[0]}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.desc}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="flex items-center">
                      <FaUser className="mr-2" />
                      {post.username}
                    </div>
                    <div className="flex items-center ml-4">
                      <FaClock className="mr-2" />
                      {formatDate(post.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
        <div className="flex flex-wrap gap-4">
          {['React', 'Node.js', 'JavaScript', 'Web Development', 'Programming'].map(category => (
            <Link 
              key={category}
              to={`/category/${category}`}
              className="px-4 py-2 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-100 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6">Get the latest posts delivered right to your inbox.</p>
        <form className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:border-black"
          />
          <button 
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}

export default Home