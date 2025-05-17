import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch, BsPersonCircle } from "react-icons/bs"
import { FaBars, FaTimes } from "react-icons/fa"

function Navbar() {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate(`/search?prompt=${encodeURIComponent(prompt.trim())}`);
      setPrompt("");
      setSearchFocused(false);
    }
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 shadow-lg' : 'bg-black'
    }`}>
      <div className='flex items-center justify-between px-4 md:px-[200px] py-4 text-white'>
        <h1 className='text-lg md:text-xl font-extrabold tracking-wider'>
          <Link to="/" className="hover:text-purple-400 transition-colors">Blogspherse</Link>
        </h1>
        
        {/* Search Bar - Hidden on mobile, visible on desktop */}
        {path === "/" && (
          <form 
            onSubmit={handleSearch}
            className='hidden md:flex items-center justify-center space-x-0'
          >
            <div className={`relative transition-all duration-300 ${
              searchFocused ? 'scale-105' : 'scale-100'
            }`}>
              <input 
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className='outline-none rounded-l-xl px-4 py-2 text-black bg-white w-64 transition-all duration-300
                          focus:ring-2 focus:ring-purple-400'
                placeholder='Search posts...'
                type="text"
                value={prompt}
              />
              <button 
                type="submit"
                className='absolute right-0 top-0 h-full bg-purple-500 text-white px-4 rounded-r-xl
                         hover:bg-purple-600 transition-colors duration-300'
              >
                <BsSearch className="text-xl" />
              </button>
            </div>
          </form>
        )}

        {/* Mobile Menu Icon */}
        <button 
          className='md:hidden p-2 hover:bg-gray-700 rounded-full transition-colors duration-300'
          onClick={() => setMenu(!menu)}
          aria-label="Toggle menu"
        >
          {menu ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center justify-center space-x-6'>
          {user ? (
            <>
              <Link 
                to="/write" 
                className="hover:text-purple-400 transition-colors flex items-center space-x-2"
              >
                <span>Write</span>
              </Link>
              <div ref={menuRef} className="relative">
                <button
                  onClick={() => setMenu(!menu)}
                  className="flex items-center space-x-2 hover:text-purple-400 transition-colors"
                >
                  <BsPersonCircle className="text-xl" />
                  <span>{user.username}</span>
                </button>
                {menu && (
                  <div className="absolute right-0 top-12 w-48 bg-black border border-gray-700 rounded-xl shadow-xl
                                transform transition-all duration-200 origin-top">
                    <div className="py-2">
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 hover:bg-gray-700 transition-colors"
                      >
                        Profile
                      </Link>
                      <Link 
                        to="/settings" 
                        className="block px-4 py-2 hover:bg-gray-700 transition-colors"
                      >
                        Settings
                      </Link>
                      <hr className="border-gray-700 my-2" />
                      <button 
                        onClick={() => {
                          setUser(null);
                          setMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="px-4 py-2 hover:text-purple-400 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Dropdown */}
        {menu && (
          <div 
            ref={menuRef}
            className="absolute top-16 left-0 right-0 bg-black border-t border-gray-700 md:hidden
                      transform transition-all duration-300 ease-in-out"
          >
            {path === "/" && (
              <form onSubmit={handleSearch} className='p-4 border-b border-gray-700'>
                <div className='flex items-center justify-center space-x-0'>
                  <input 
                    onChange={(e) => setPrompt(e.target.value)}
                    className='outline-none rounded-l-xl px-4 py-2 text-black bg-white w-full
                              focus:ring-2 focus:ring-purple-400'
                    placeholder='Search posts...'
                    type="text"
                    value={prompt}
                  />
                  <button 
                    type="submit"
                    className='bg-purple-500 text-white px-4 py-2 rounded-r-xl hover:bg-purple-600 transition-colors'
                  >
                    <BsSearch className="text-xl" />
                  </button>
                </div>
              </form>
            )}
            <div className="flex flex-col py-2">
              {user ? (
                <>
                  <Link 
                    to="/write" 
                    className="px-4 py-3 hover:bg-gray-700 transition-colors flex items-center space-x-2"
                    onClick={() => setMenu(false)}
                  >
                    <span>Write</span>
                  </Link>
                  <Link 
                    to="/profile" 
                    className="px-4 py-3 hover:bg-gray-700 transition-colors"
                    onClick={() => setMenu(false)}
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="px-4 py-3 hover:bg-gray-700 transition-colors"
                    onClick={() => setMenu(false)}
                  >
                    Settings
                  </Link>
                  <button 
                    onClick={() => {
                      setUser(null);
                      setMenu(false);
                    }}
                    className="px-4 py-3 text-left text-red-400 hover:bg-gray-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="px-4 py-3 hover:bg-gray-700 transition-colors"
                    onClick={() => setMenu(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-3 hover:bg-gray-700 transition-colors"
                    onClick={() => setMenu(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar