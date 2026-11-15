import React from 'react'
import { Calendar, Sparkles, Award } from 'lucide-react'

export default function History() {
  return (
    <div className="bg-white text-gray-800 animate-fadeIn">
      
      {/* Header */}
      <section className="relative bg-churchNavy text-white py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2000')` }}></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-churchGold/20 border border-churchGold/30 text-churchGold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={14} /> Our Journey
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Our History</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
            Tracing God's faithful guidance from a humble living-room prayer gathering to an established community of believers in Athens.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-12 border-l-2 border-churchGold/40 pl-6 sm:pl-10 ml-4 sm:ml-8">
          
          <div className="relative">
            <div className="absolute -left-[35px] sm:-left-[51px] top-0 w-8 h-8 rounded-full bg-churchNavy text-churchGold flex items-center justify-center font-bold shadow-md border-2 border-churchGold">
              1
            </div>
            <div className="bg-gray-50 border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm">
              <span className="text-xs font-bold uppercase text-churchGold bg-churchNavy px-3 py-1 rounded-full">November 2025</span>
              <h3 className="text-2xl font-bold text-churchNavy mt-3 mb-2">The Living-Room Prayer Gathering</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Athens Nepali Church started as a small, heartfelt prayer gathering in a living room in Athens, November 2025. A few Nepali believers came together regularly to worship God, read the Bible, and pray for one another and the Greek community.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[35px] sm:-left-[51px] top-0 w-8 h-8 rounded-full bg-churchNavy text-churchGold flex items-center justify-center font-bold shadow-md border-2 border-churchGold">
              2
            </div>
            <div className="bg-gray-50 border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm">
              <span className="text-xs font-bold uppercase text-churchGold bg-churchNavy px-3 py-1 rounded-full">Growth & Sunday Worship</span>
              <h3 className="text-2xl font-bold text-churchNavy mt-3 mb-2">Transition to Regular Sunday Services</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                As more Nepali believers and seekers joined the fellowship, the group organized regular Sunday worship services at Patision 11, creating a welcoming spiritual home in the center of Athens.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[35px] sm:-left-[51px] top-0 w-8 h-8 rounded-full bg-churchNavy text-churchGold flex items-center justify-center font-bold shadow-md border-2 border-churchGold">
              3
            </div>
            <div className="bg-gray-50 border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm">
              <span className="text-xs font-bold uppercase text-churchGold bg-churchNavy px-3 py-1 rounded-full">Present & Future</span>
              <h3 className="text-2xl font-bold text-churchNavy mt-3 mb-2">A Growing Family in Christ</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Today, Athens Nepali Church continues to grow in faith, unity, and love. We look forward to all that God will do as we reach out to our community with the message of hope and salvation.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}