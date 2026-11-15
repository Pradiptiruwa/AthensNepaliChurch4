import React from 'react'
import { Clock, MapPin, Music, BookOpen, Coffee, Sparkles } from 'lucide-react'

export default function Worship() {
  return (
    <div className="bg-white text-gray-800 animate-fadeIn">
      
      {/* Header */}
      <section className="relative bg-churchNavy text-white py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=2000')` }}></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-churchGold/20 border border-churchGold/30 text-churchGold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={14} /> Sunday Gathering
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Worship Service</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
            Experience uplifting Nepali and English worship, encouraging biblical messages, and warm Christian fellowship.
          </p>
        </div>
      </section>

      {/* Main Service Info Card */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-churchNavy text-white p-8 sm:p-12 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <Music size={220} />
          </div>
          <div className="relative z-10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-churchGold">Weekly Gathering</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold">Sunday Worship Service</h2>
            <p className="text-gray-300 max-w-xl text-sm sm:text-base leading-relaxed">
              We gather every week to lift our voices in praise, study God's Word together, and pray for one another in the center of Athens.
            </p>
          </div>
          <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shrink-0 w-full md:w-auto text-center">
            <p className="text-xs uppercase text-churchGold font-bold mb-1">Time & Location</p>
            <p className="text-xl font-extrabold">11:00 AM – 1:00 PM</p>
            <p className="text-xs text-gray-300 mt-1">Patision 11, Athens, Greece</p>
          </div>
        </div>
      </section>

      {/* What to Expect Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-churchGold font-bold text-xs uppercase tracking-widest">Service Structure</span>
          <h2 className="text-3xl font-extrabold text-churchNavy mt-2">What to Expect</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-14 h-14 bg-churchNavy text-churchGold rounded-xl flex items-center justify-center mb-6 shadow-md">
              <Music size={26} />
            </div>
            <h3 className="text-xl font-bold text-churchNavy mb-3">Praise & Worship</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Heartfelt worship through traditional and contemporary Nepali Christian songs, lifting our hearts and voices to God together.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-14 h-14 bg-churchNavy text-churchGold rounded-xl flex items-center justify-center mb-6 shadow-md">
              <BookOpen size={26} />
            </div>
            <h3 className="text-xl font-bold text-churchNavy mb-3">Word of God</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Expository and practical preaching straight from the Holy Bible, designed to guide our daily walk of faith and spiritual growth.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-14 h-14 bg-churchNavy text-churchGold rounded-xl flex items-center justify-center mb-6 shadow-md">
              <Coffee size={26} />
            </div>
            <h3 className="text-xl font-bold text-churchNavy mb-3">Fellowship & Tea</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Connecting with one another after the service over tea, sharing life stories, encouraging one another, and praying together.
            </p>
          </div>

        </div>
      </section>

    </div>
  )
}