import React from 'react'
import { Heart, Users, BookOpen, ShieldCheck, MapPin, Sparkles } from 'lucide-react'

export default function About() {
  return (
    <div className="bg-white text-gray-800 animate-fadeIn">
      
      {/* Hero Header */}
      <section className="relative bg-churchNavy text-white py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=2000')` }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-churchGold/20 border border-churchGold/30 text-churchGold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={14} /> Who We Are
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">About Athens Nepali Church</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
            A Christ-centered, multicultural Nepali Christian fellowship worshiping God and serving our community in Athens, Greece.
          </p>
        </div>
      </section>

      {/* Vision & Mission Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <div className="bg-gray-50 border border-gray-100 p-8 sm:p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-churchNavy text-churchGold rounded-xl flex items-center justify-center mb-6 shadow-md">
              <Heart size={24} />
            </div>
            <h2 className="text-2xl font-bold text-churchNavy mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed text-base">
              To build a vibrant spiritual home where Nepali believers and friends in Greece can encounter the living God, grow in deep biblical truth, and experience genuine Christian love and support.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-100 p-8 sm:p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-churchNavy text-churchGold rounded-xl flex items-center justify-center mb-6 shadow-md">
              <BookOpen size={24} />
            </div>
            <h2 className="text-2xl font-bold text-churchNavy mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed text-base">
              To proclaim the Gospel of Jesus Christ through heartfelt worship in Nepali and English, systematic Bible teaching, fervent prayer, and compassionate fellowship.
            </p>
          </div>

        </div>
      </section>

      {/* Leadership Section */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-churchGold font-bold text-xs uppercase tracking-widest">Spiritual Guidance</span>
          <h2 className="text-3xl font-extrabold text-churchNavy mt-2 mb-12">Church Leadership</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center">
              <div className="w-20 h-20 bg-churchNavy text-churchGold rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-md">
                SS
              </div>
              <h3 className="text-xl font-bold text-churchNavy">Sagar Sunar</h3>
              <p className="text-xs uppercase font-bold text-churchGold mt-1 mb-3">Church Elder</p>
              <p className="text-sm text-gray-500">Leading the congregation in worship, prayer, and pastoral care.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center">
              <div className="w-20 h-20 bg-churchNavy text-churchGold rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-md">
                JT
              </div>
              <h3 className="text-xl font-bold text-churchNavy">Joseph Tiruwa</h3>
              <p className="text-xs uppercase font-bold text-churchGold mt-1 mb-3">Church Elder</p>
              <p className="text-sm text-gray-500">Committed to biblical teaching and fellowship building in Athens.</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}