import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Church, ChevronDown } from 'lucide-react'
import { useLanguage } from '../services/LanguageContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [aboutDropdown, setAboutDropdown] = useState(false)
  const { t } = useLanguage()

  return (
    <nav className="bg-churchNavy text-white sticky top-0 z-50 shadow-md backdrop-blur-md bg-opacity-95 transition-all">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          
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
            <span className="text-lg font-bold tracking-wide group-hover:text-churchGold transition-colors whitespace-nowrap">
              Athens Nepali Church
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-2">
            <Link to="/" className="text-sm font-medium px-3 py-2 rounded-lg hover:text-churchGold hover:bg-white/5 transition-all whitespace-nowrap">
              {t('navHome')}
            </Link>

            {/* About Dropdown Menu (Combines About & History cleanly) */}
            <div 
              className="relative"
              onMouseEnter={() => setAboutDropdown(true)}
              onMouseLeave={() => setAboutDropdown(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg hover:text-churchGold hover:bg-white/5 transition-all whitespace-nowrap cursor-pointer">
                {t('navAbout')} <ChevronDown size={14} className={`transition-transform duration-200 ${aboutDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {aboutDropdown && (
                <div className="absolute left-0 top-full pt-1 w-44 z-50 animate-fadeIn">
                  <div className="bg-churchNavy border border-white/10 rounded-xl shadow-xl py-2 overflow-hidden">
                    <Link 
                      to="/about" 
                      onClick={() => setAboutDropdown(false)}
                      className="block px-4 py-2.5 text-sm text-gray-200 hover:bg-churchGold hover:text-churchNavy font-medium transition-colors"
                    >
                      About Us
                    </Link>
                    <Link 
                      to="/history" 
                      onClick={() => setAboutDropdown(false)}
                      className="block px-4 py-2.5 text-sm text-gray-200 hover:bg-churchGold hover:text-churchNavy font-medium transition-colors"
                    >
                      {t('navHistory')}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/worship" className="text-sm font-medium px-3 py-2 rounded-lg hover:text-churchGold hover:bg-white/5 transition-all whitespace-nowrap">
              {t('navWorship')}
            </Link>
            <Link to="/events" className="text-sm font-medium px-3 py-2 rounded-lg hover:text-churchGold hover:bg-white/5 transition-all whitespace-nowrap">
              {t('navEvents')}
            </Link>
            <Link to="/gallery" className="text-sm font-medium px-3 py-2 rounded-lg hover:text-churchGold hover:bg-white/5 transition-all whitespace-nowrap">
              {t('navGallery')}
            </Link>
            <Link to="/sermons" className="text-sm font-medium px-3 py-2 rounded-lg hover:text-churchGold hover:bg-white/5 transition-all whitespace-nowrap">
              {t('navSermons')}
            </Link>
            <Link to="/prayer-wall" className="text-sm font-medium px-3 py-2 rounded-lg hover:text-churchGold hover:bg-white/5 transition-all whitespace-nowrap">
              {t('navPrayer')}
            </Link>
            <Link to="/contact" className="text-sm font-medium px-3 py-2 rounded-lg hover:text-churchGold hover:bg-white/5 transition-all whitespace-nowrap">
              {t('navContact')}
            </Link>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden xl:flex items-center space-x-3 shrink-0">
            <Link
              to="/plan-visit"
              className="border border-churchGold/60 text-churchGold px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-churchGold hover:text-churchNavy transition-all whitespace-nowrap"
            >
              Plan Visit
            </Link>

            <Link
              to="/admin"
              className="bg-churchGold text-churchNavy px-4 py-2 rounded-xl text-xs font-bold hover:bg-yellow-500 transition-colors shadow-sm whitespace-nowrap"
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
        <div className="xl:hidden bg-churchNavy border-t border-gray-800 px-6 pt-4 pb-6 space-y-2 animate-fadeIn">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-base font-medium hover:text-churchGold py-2 border-b border-gray-800/50">{t('navHome')}</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block text-base font-medium hover:text-churchGold py-2 border-b border-gray-800/50">About Us</Link>
          <Link to="/history" onClick={() => setIsOpen(false)} className="block text-base font-medium hover:text-churchGold py-2 border-b border-gray-800/50">{t('navHistory')}</Link>
          <Link to="/worship" onClick={() => setIsOpen(false)} className="block text-base font-medium hover:text-churchGold py-2 border-b border-gray-800/50">{t('navWorship')}</Link>
          <Link to="/events" onClick={() => setIsOpen(false)} className="block text-base font-medium hover:text-churchGold py-2 border-b border-gray-800/50">{t('navEvents')}</Link>
          <Link to="/gallery" onClick={() => setIsOpen(false)} className="block text-base font-medium hover:text-churchGold py-2 border-b border-gray-800/50">{t('navGallery')}</Link>
          <Link to="/sermons" onClick={() => setIsOpen(false)} className="block text-base font-medium hover:text-churchGold py-2 border-b border-gray-800/50">{t('navSermons')}</Link>
          <Link to="/prayer-wall" onClick={() => setIsOpen(false)} className="block text-base font-medium hover:text-churchGold py-2 border-b border-gray-800/50">{t('navPrayer')}</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-base font-medium hover:text-churchGold py-2 border-b border-gray-800/50">{t('navContact')}</Link>

          <div className="pt-4 space-y-2.5">
            <Link
              to="/plan-visit"
              onClick={() => setIsOpen(false)}
              className="block text-center border border-churchGold text-churchGold px-4 py-2.5 rounded-xl font-bold text-sm"
            >
              Plan Your Visit
            </Link>
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-churchGold text-churchNavy px-4 py-3 rounded-xl font-bold shadow-md"
            >
              {t('adminLogin')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}