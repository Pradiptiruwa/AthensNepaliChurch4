import React from 'react'
import { Link } from 'react-router-dom'
import { Clock, MapPin, Music, BookOpen, Coffee, Sparkles, Video, ArrowRight } from 'lucide-react'

export default function Worship() {
  return (
    <div className="bg-white text-gray-800 animate-fadeIn">
      
      {/* Header */}
      <section className="relative bg-churchNavy text-white py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        

{/* Background Image using <img> tag so it never cuts */}
<div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none flex items-center justify-center">
  <img 
    src="/worship.png" 
    alt="Worship Background" 
    className="w-full h-full object-contain object-center"

  />
</div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-churchGold/20 border border-churchGold/30 text-churchGold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={14} /> Weekly Gatherings
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Worship &amp; Fellowship</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
            Experience uplifting Nepali and English worship, encouraging biblical messages, and warm Christian fellowship both in-person and online.
          </p>
        </div>
      </section>

      {/* Main Sunday Service Info Card */}
      <section className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-churchNavy text-white p-8 sm:p-12 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <Music size={220} />
          </div>
          <div className="relative z-10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-churchGold">Main In-Person Gathering</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold">Sunday Worship Service</h2>
            <p className="text-gray-300 max-w-xl text-sm sm:text-base leading-relaxed">
              We gather every Sunday to lift our voices in praise, study God's Word together, and pray for one another in the center of Athens.
            </p>
          </div>
          <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shrink-0 w-full md:w-auto text-center">
            <p className="text-xs uppercase text-churchGold font-bold mb-1">Every Sunday</p>
            <p className="text-xl font-extrabold">11:00 AM – 1:00 PM</p>
            <p className="text-xs text-gray-300 mt-1 flex items-center justify-center gap-1">
              <MapPin size={13} className="text-churchGold" /> Patision 11, Athens, Greece
            </p>
          </div>
        </div>
      </section>

      {/* Online Midweek Gatherings (Monday & Thursday) */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Monday Online Fellowship */}
          <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Video size={14} /> Google Meet Online
                </span>
                <span className="text-xs font-bold text-churchNavy bg-churchGold/20 px-3 py-1 rounded-full">
                  Every Monday
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-churchNavy mb-2">Online Fellowship</h3>
              <p className="text-sm font-bold text-gray-700 flex items-center gap-1.5 mb-3">
                <Clock size={16} className="text-churchGold" /> 8:00 PM – 9:00 PM (Athens Time)
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Start your week connected in prayer, encouragement, and sharing testimonies together from wherever you are in Greece.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200">
              <Link to="/plan-visit" className="inline-flex items-center gap-1.5 text-sm font-bold text-churchNavy hover:text-churchGold transition-colors">
                Request Google Meet Link <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Thursday Online Bible Study */}
          <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Video size={14} /> Google Meet Online
                </span>
                <span className="text-xs font-bold text-churchNavy bg-churchGold/20 px-3 py-1 rounded-full">
                  Every Thursday
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-churchNavy mb-2">Online Bible Study</h3>
              <p className="text-sm font-bold text-gray-700 flex items-center gap-1.5 mb-3">
                <Clock size={16} className="text-churchGold" /> 7:30 PM – 9:00 PM (Athens Time)
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Dive deeper into Scripture with interactive Bible study, discussion, and group prayer via Google Meet.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200">
              <Link to="/plan-visit" className="inline-flex items-center gap-1.5 text-sm font-bold text-churchNavy hover:text-churchGold transition-colors">
                Request Google Meet Link <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* What to Expect Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-100">
        <div className="text-center mb-16">
          <span className="text-churchGold font-bold text-xs uppercase tracking-widest">Service Structure</span>
          <h2 className="text-3xl font-extrabold text-churchNavy mt-2">What to Expect on Sunday</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-14 h-14 bg-churchNavy text-churchGold rounded-xl flex items-center justify-center mb-6 shadow-md">
              <Music size={26} />
            </div>
            <h3 className="text-xl font-bold text-churchNavy mb-3">Praise &amp; Worship</h3>
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
            <h3 className="text-xl font-bold text-churchNavy mb-3">Fellowship &amp; Tea</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Connecting with one another after the service over tea, sharing life stories, encouraging one another, and praying together.
            </p>
          </div>

        </div>
      </section>

    </div>
  )
}