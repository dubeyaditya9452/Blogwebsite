import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUser, FaClock, FaArrowLeft, FaHeart, FaShare, FaBookmark, FaComment } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/posts/${postId}`);
        setPost(res.data);
        
        // Calculate reading time
        if (res.data.content) {
          const words = res.data.content.split(/\s+/).length;
          const time = Math.ceil(words / 200); // Assuming 200 words per minute
          setReadingTime(time);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch post');
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = post.title;
    
    switch(platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`);
        break;
      default:
        break;
    }
    setShowShareMenu(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error || 'Post not found'}
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="container mx-auto px-4 py-8">
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-black mb-8"
        >
          <FaArrowLeft className="mr-2" />
          Back to Posts
        </motion.button>

        <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          {post.photo && (
            <motion.div 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative h-[400px] w-full overflow-hidden"
            >
              <img
                src={post.photo}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
          )}

          <div className="p-8">
            <motion.header 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <div className="flex items-center">
                  <FaUser className="mr-2" />
                  <span>{post.username}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center">
                  <span>•</span>
                  <span className="ml-2">{readingTime} min read</span>
                </div>
              </div>
              {post.categories && post.categories.length > 0 && (
                <div className="flex gap-2">
                  {post.categories.map(category => (
                    <motion.span
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {category}
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.header>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="prose prose-lg max-w-none"
            >
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 pt-8 border-t border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center space-x-2 ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
                  >
                    <FaHeart />
                    <span>{post.likes + (isLiked ? 1 : 0)}</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 text-gray-600"
                  >
                    <FaComment />
                    <span>{post.comments || 0}</span>
                  </motion.button>
                </div>
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`text-2xl ${isBookmarked ? 'text-blue-500' : 'text-gray-600'}`}
                  >
                    <FaBookmark />
                  </motion.button>
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="text-2xl text-gray-600"
                    >
                      <FaShare />
                    </motion.button>
                    {showShareMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10"
                      >
                        <button
                          onClick={() => handleShare('twitter')}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Share on Twitter
                        </button>
                        <button
                          onClick={() => handleShare('facebook')}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Share on Facebook
                        </button>
                        <button
                          onClick={() => handleShare('linkedin')}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Share on LinkedIn
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </article>
      </div>
    </motion.div>
  );
};

export default PostDetail; 