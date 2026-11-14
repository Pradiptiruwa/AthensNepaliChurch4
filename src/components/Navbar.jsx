import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Church, Globe } from 'lucide-react'
import { useLanguage } from '../services/LanguageContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()

  const navLinks = [
    { name: t('navHome'), path: '/' },
    { name: t('navAbout'), path: '/about' },
    { name: t('navHistory'), path: '/history' },
    { name: t('navWorship'), path: '/worship' },
    { name: t('navEvents'), path: '/events' },
    { name: t('navGallery'), path: '/gallery' },
    { name: t('navSermons'), path: '/sermons' },
    { name: t('navContact'), path: '/contact' },
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
                alt="Logo" 
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
          <div className="hidden lg:flex items-center space-x-5">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                className="text-sm font-medium hover:text-churchGold transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* Language Selector Dropdown */}
            <div className="flex items-center bg-white/10 px-2 py-1 rounded-md">
              <Globe size={16} className="text-churchGold mr-1.5" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="en" className="bg-churchNavy text-white">English</option>
                <option value="ne" className="bg-churchNavy text-white">नेपाली</option>
                <option value="el" className="bg-churchNavy text-white">Ελληνικά</option>
              </select>
            </div>

            <Link
              to="/admin"
              className="bg-churchGold text-churchNavy px-4 py-2 rounded-md text-sm font-semibold hover:bg-yellow-500 transition-colors"
            >
              {t('adminLogin')}
            </Link>
          </div>

          {/* Mobile Menu & Language Toggle Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-white/10 text-white text-xs font-semibold px-2 py-1.5 rounded-md focus:outline-none"
            >
              <option value="en" className="bg-churchNavy">EN</option>
              <option value="ne" className="bg-churchNavy">नेपा</option>
              <option value="el" className="bg-churchNavy">EL</option>
            </select>
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
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
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
            {t('adminLogin')}
          </Link>
        </div>
      )}
    </nav>
  )
}