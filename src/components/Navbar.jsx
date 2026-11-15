import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Church } from 'lucide-react'
import { useLanguage } from '../services/LanguageContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  const navLinks = [
    { name: t('navHome'), path: '/' },
    { name: t('navAbout'), path: '/about' },
    { name: t('navHistory'), path: '/history' },
    { name: t('navWorship'), path: '/worship' },
    { name: t('navEvents'), path: '/events' },
    { name: t('navGallery'), path: '/gallery' },
    { name: t('navSermons'), path: '/sermons' },
    { name: t('navPrayer'), path: '/prayer-wall' },
    { name: t('navContact'), path: '/contact' },
  ]

  return (
    <nav className="bg-churchNavy text-white sticky top-0 z-50 shadow-md backdrop-blur-md bg-opacity-95 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Church Name */}
          <Link to="/" className="flex items-center space-x-3 group shrink-0">
            <div className="w-11 h-11 rounded-full overflow-hidden bg-churchGold flex items-center justify-center p-0.5 shadow-md shrink-0 transition-transform group-hover:scale-105">
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
              <span className="text-lg font-bold tracking-wide group-hover:text-churchGold transition-colors whitespace-nowrap">
                Athens Nepali Church
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-1.5">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                className="text-sm font-medium px-2.5 py-2 rounded-md hover:text-churchGold hover:bg-white/5 transition-all whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/admin"
              className="bg-churchGold text-churchNavy px-4 py-2 rounded-lg text-xs font-bold hover:bg-yellow-500 transition-colors shadow-sm whitespace-nowrap ml-3"
            >
              {t('adminLogin')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center">
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
        <div className="xl:hidden bg-churchNavy border-t border-gray-800 px-6 pt-4 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium hover:text-churchGold py-1.5 border-b border-gray-800/50"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            className="block text-center bg-churchGold text-churchNavy px-4 py-3 rounded-lg font-bold mt-4"
          >
            {t('adminLogin')}
          </Link>
        </div>
      )}
    </nav>
  )
}