import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Church } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Our History', path: '/history' },
    { name: 'Worship Service', path: '/worship' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Sermons', path: '/sermons' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <nav className="bg-churchNavy text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Church Name */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-full overflow-hidden bg-churchGold flex items-center justify-center p-0.5 shadow-sm shrink-0">
              <img 
                src="/logo.png" 
                alt="Athens Nepali Church Logo" 
                className="w-full h-full object-cover rounded-full bg-white"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full bg-churchGold text-churchNavy items-center justify-center">
                <Church size={22} />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-wide">Athens Nepali Church</span>
              <span className="block text-xs text-churchGold tracking-widest">एथेन्स नेपाली मण्डली</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium hover:text-churchGold transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              className="bg-churchGold text-churchNavy px-4 py-2 rounded-md text-sm font-semibold hover:bg-yellow-500 transition-colors"
            >
              Admin Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-churchGold focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden bg-churchNavy border-t border-gray-800 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium hover:text-churchGold py-1"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            className="block text-center bg-churchGold text-churchNavy px-4 py-2 rounded-md font-semibold mt-4"
          >
            Admin Login
          </Link>
        </div>
      )}
    </nav>
  )
}