import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs"
import { FaBars } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [prompt, setPrompt] = useState("");//Store search value
  const [menu, setMenu] = useState(false);//Store menu State
  const [user, setUser] = useState(null);//Store user State
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const showMenu = () => {
    setMenu(!menu);
  }

  return (
    <div className='flex items-center justify-between px-4 md:px-[200px] py-4 bg-black text-white'>
      <h1 className='text-lg md:text-xl font-extrabold'>
        <Link to="/">Blogspherse</Link>
      </h1>
      
      {/* Search Bar - Hidden on mobile, visible on desktop */}
      {path === "/" && (
        <div className='hidden md:flex items-center justify-center space-x-0'>
          <input 
            onChange={(e) => setPrompt(e.target.value)}
            className='outline-none rounded-l-xl px-3 py-1 text-black bg-white'
            placeholder='Search a post'
            type="text"
            value={prompt}
          />
          <button 
            onClick={() => navigate(`/search?prompt=${prompt}`)}
            className='bg-white text-black px-3 py-1.5 cursor-pointer rounded-r-xl hover:bg-gray-100'
          >
            <BsSearch className="text-xl" />
          </button>
        </div>
      )}

      {/* Mobile Menu Icon */}
      <div className='md:hidden cursor-pointer' onClick={showMenu}>
        <FaBars className="text-2xl" />
      </div>

      {/* Desktop Navigation */}
      <div className='hidden md:flex items-center justify-center space-x-2 md:space-x-4'>
        {user ? (
          <>
            <h3><Link to="/write" className="hover:text-gray-300">Write</Link></h3>
            <div onClick={showMenu} className="cursor-pointer relative">
              <FaBars className="text-xl hover:text-gray-300" />
              {menu && (
                <div className="absolute right-0 top-8 w-32 bg-black border border-gray-300 rounded-lg shadow-lg">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700">Profile</Link>
                  <button 
                    onClick={() => setUser(null)} 
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex space-x-4">
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/register" className="hover:text-gray-300">Register</Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {menu && (
        <div className="absolute top-16 left-0 right-0 bg-black border-t border-gray-700 md:hidden">
          {path === "/" && (
            <div className='p-4 border-b border-gray-700'>
              <div className='flex items-center justify-center space-x-0'>
                <input 
                  onChange={(e) => setPrompt(e.target.value)}
                  className='outline-none rounded-l-xl px-3 py-1 text-black bg-white w-full'
                  placeholder='Search a post'
                  type="text"
                  value={prompt}
                />
                <button 
                  onClick={() => {
                    navigate(`/search?prompt=${prompt}`);
                    setMenu(false);
                  }}
                  className='bg-white text-black px-3 py-1.5 cursor-pointer rounded-r-xl hover:bg-gray-100'
                >
                  <BsSearch className="text-xl" />
                </button>
              </div>
            </div>
          )}
          <div className="flex flex-col">
            {user ? (
              <>
                <Link to="/write" className="px-4 py-2 hover:bg-gray-700" onClick={() => setMenu(false)}>Write</Link>
                <Link to="/profile" className="px-4 py-2 hover:bg-gray-700" onClick={() => setMenu(false)}>Profile</Link>
                <button 
                  onClick={() => {
                    setUser(null);
                    setMenu(false);
                  }}
                  className="px-4 py-2 text-left hover:bg-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 hover:bg-gray-700" onClick={() => setMenu(false)}>Login</Link>
                <Link to="/register" className="px-4 py-2 hover:bg-gray-700" onClick={() => setMenu(false)}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar