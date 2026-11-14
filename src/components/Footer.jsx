import React from 'react'
import { MapPin, Clock, Phone, Mail, Church } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-churchNavy text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-churchGold p-2 rounded-full text-churchNavy">
                <Church size={24} />
              </div>
              <span className="text-lg font-bold text-white">Athens Nepali Church</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A vibrant spiritual family in the heart of Greece, growing together in faith, worship, and God's word.
            </p>
            <p className="mt-4 text-xs italic text-churchGold">
              "The Lord has done great things for us, and we are filled with joy." — Psalm 126:3
            </p>
          </div>

          {/* Column 2: Service Time & Location */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 border-b border-gray-700 pb-2">Worship & Location</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <Clock className="text-churchGold shrink-0 mt-1" size={18} />
                <div>
                  <p className="font-medium text-white">Sunday Worship Service</p>
                  <p className="text-gray-400">11:00 AM – 1:00 PM</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="text-churchGold shrink-0 mt-1" size={18} />
                <div>
                  <p className="font-medium text-white">Address</p>
                  <p className="text-gray-400">Patision 11, Athens, Greece</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3: Leadership Contacts */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 border-b border-gray-700 pb-2">Leadership Contacts</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <Phone className="text-churchGold shrink-0" size={18} />
                <div>
                  <p className="font-medium text-white">Sagar Sunar (Elder)</p>
                  <a href="tel:+306949651076" className="text-gray-400 hover:text-churchGold">+30 694 965 1076</a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-churchGold shrink-0" size={18} />
                <div>
                  <p className="font-medium text-white">Joseph Tiruwa (Elder)</p>
                  <a href="tel:+306972366505" className="text-gray-400 hover:text-churchGold">+30 697 236 6505</a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Athens Nepali Church. All rights reserved.
        </div>
      </div>
    </footer>
  )
}