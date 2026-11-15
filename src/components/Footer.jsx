import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Clock, Video, Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-churchNavy text-white pt-16 pb-8 border-t border-churchGold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 bg-churchGold text-churchNavy rounded-xl flex items-center justify-center font-extrabold text-lg shadow-md">
                AN
              </span>
              <span className="font-extrabold text-lg tracking-tight text-white">Athens Nepali Church</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed font-light">
              A vibrant community of believers worshiping God and sharing His love in the heart of Athens, Greece.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-churchGold font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-churchGold transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/history" className="text-gray-300 hover:text-churchGold transition-colors">Our History</Link>
              </li>
              <li>
                <Link to="/worship" className="text-gray-300 hover:text-churchGold transition-colors">Worship Service</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-churchGold transition-colors">Upcoming Events</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-churchGold transition-colors">Photo Gallery</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Worship & Location */}
          <div>
            <h3 className="text-churchGold font-bold text-sm uppercase tracking-wider mb-4">Worship & Location</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="text-churchGold shrink-0 mt-1" size={16} />
                <span>Patision 11, Athens, Greece</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="text-churchGold shrink-0" size={16} />
                <span>Sundays: 11:00 AM – 1:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div>
            <h3 className="text-churchGold font-bold text-sm uppercase tracking-wider mb-4">Stay Connected</h3>
            <p className="text-sm text-gray-300 mb-4">Join our fellowship and grow in faith with us.</p>
            <div className="flex items-center gap-3">
              {/* TikTok Link */}
              <a 
                href="https://www.tiktok.com/@athens.nepali.chu?_r=1&_t=ZS-9BKs8F35IVF" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/10 hover:bg-churchGold hover:text-churchNavy text-white rounded-xl flex items-center justify-center transition-all shadow-sm"
                title="Athens Nepali Church TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>

              {/* YouTube Link */}
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/10 hover:bg-churchGold hover:text-churchNavy text-white rounded-xl flex items-center justify-center transition-all shadow-sm"
                title="Sermons & Videos"
              >
                <Video size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Athens Nepali Church. All rights reserved.</p>
          <p className="flex items-center gap-1 font-light">
            Designed for fellowship in Athens, Greece <Sparkles size={13} className="text-churchGold" />
          </p>
        </div>

      </div>
    </footer>
  )
}