import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Clock, ArrowRight, Heart, Users, BookOpen } from 'lucide-react'

export default function Home() {
  return (
    <div className="bg-white text-gray-800">
      
      {/* Hero Section */}
      <section className="relative bg-churchNavy text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-churchGold/20 text-churchGold px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">
            Welcome to Athens Nepali Church • एथेन्स नेपाली मण्डली
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Growing Together in Faith, <br className="hidden sm:inline" />
            <span className="text-churchGold">Worship, and God's Word</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 mb-10">
            A welcoming Nepali Christian family in the heart of Athens, Greece. Join us every Sunday as we lift up the name of Jesus together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/worship"
              className="bg-churchGold text-churchNavy px-8 py-3.5 rounded-lg font-bold text-base hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
            >
              Plan Your Visit <ArrowRight size={18} />
            </Link>
            <Link
              to="/history"
              className="border border-gray-500 text-white px-8 py-3.5 rounded-lg font-semibold text-base hover:border-churchGold hover:text-churchGold transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Service Info Banner */}
      <section className="bg-gray-50 border-b border-gray-200 py-8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-4">
            <div className="bg-churchNavy text-churchGold p-3 rounded-lg">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Sunday Worship</p>
              <p className="font-bold text-churchNavy">11:00 AM – 1:00 PM</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start space-x-4">
            <div className="bg-churchNavy text-churchGold p-3 rounded-lg">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Location</p>
              <p className="font-bold text-churchNavy">Patision 11, Athens, Greece</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start space-x-4">
            <div className="bg-churchNavy text-churchGold p-3 rounded-lg">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Upcoming Events</p>
              <Link to="/events" className="font-bold text-churchNavy hover:text-churchGold underline">
                View Church Calendar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-churchNavy">Our Heart & Mission</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            From a small living-room prayer gathering in November 2025 to a growing family of believers, we are committed to Christ-centered fellowship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-churchNavy/10 text-churchNavy rounded-lg flex items-center justify-center mb-5">
              <Heart size={24} />
            </div>
            <h3 className="text-xl font-bold text-churchNavy mb-3">Spirit-Filled Worship</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We gather every Sunday to praise God in Nepali and English, experiencing His presence through heartfelt music and prayer.
            </p>
          </div>

          <div className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-churchNavy/10 text-churchNavy rounded-lg flex items-center justify-center mb-5">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-bold text-churchNavy mb-3">Biblical Teaching</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Grounded in Scripture, our messages equip believers to live out their faith boldly in everyday life in Greece.
            </p>
          </div>

          <div className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-churchNavy/10 text-churchNavy rounded-lg flex items-center justify-center mb-5">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold text-churchNavy mb-3">Loving Community</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Whether you are new to Athens or have lived here for years, you have a spiritual home and family waiting for you.
            </p>
          </div>
        </div>
      </section>

      {/* Scripture Banner */}
      <section className="bg-churchNavy text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <blockquote className="text-2xl sm:text-3xl font-serif italic text-churchGold mb-4">
            "The Lord has done great things for us, and we are filled with joy."
          </blockquote>
          <p className="text-sm uppercase tracking-widest text-gray-400">— Psalm 126:3</p>
        </div>
      </section>

    </div>
  )
}