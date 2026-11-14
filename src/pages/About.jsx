import React from 'react'
import { Phone, ShieldCheck, Globe, Users } from 'lucide-react'

export default function About() {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-churchNavy mb-4">About Athens Nepali Church</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A Christ-centered fellowship dedicated to uniting Nepali-speaking believers in Athens through worship, discipleship, and mutual care.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="text-churchGold" size={28} />
              <h2 className="text-2xl font-bold text-churchNavy">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To glorify God by sharing the Gospel of Jesus Christ, nurturing spiritual growth among the Nepali diaspora in Greece, and serving our local community with compassion and grace.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <ShieldCheck className="text-churchGold" size={28} />
              <h2 className="text-2xl font-bold text-churchNavy">What We Believe</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We believe in the Triune God—Father, Son, and Holy Spirit—salvation by grace through faith in Jesus Christ, and the authority of the Holy Bible as God's inspired Word.
            </p>
          </div>
        </div>

        {/* Leadership Section */}
        <div className="border-t border-gray-200 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-churchNavy">Church Leadership</h2>
            <p className="text-gray-600 mt-2">Serving the congregation with prayer, guidance, and pastoral care.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
              <div className="w-16 h-16 bg-churchNavy text-churchGold rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-churchNavy">Sagar Sunar</h3>
              <p className="text-sm font-medium text-churchGold mb-4">Elder</p>
              <a
                href="tel:+306949651076"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-churchNavy font-medium"
              >
                <Phone size={16} /> +30 694 965 1076
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
              <div className="w-16 h-16 bg-churchNavy text-churchGold rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-churchNavy">Joseph Tiruwa</h3>
              <p className="text-sm font-medium text-churchGold mb-4">Elder</p>
              <a
                href="tel:+306972366505"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-churchNavy font-medium"
              >
                <Phone size={16} /> +30 697 236 6505
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}