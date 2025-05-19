import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { FaUser, FaClock } from 'react-icons/fa'

const CategoryPosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { category } = useParams()

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`http://localhost:5000/api/posts/category/${category}`)
        setPosts(res.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch posts')
        setLoading(false)
      }
    }
    fetchCategoryPosts()
  }, [category])

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Posts in {category}</h1>
        <p className="text-gray-600">Found {posts.length} posts in this category</p>
      </div>

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

      {posts.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-600">No posts found in this category</h2>
          <p className="mt-4 text-gray-500">Check back later for new content!</p>
        </div>
      )}
    </div>
  )
}

export default CategoryPosts 