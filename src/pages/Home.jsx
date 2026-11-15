import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'
import { Calendar, MapPin, Clock, ArrowRight, Heart, Users, BookOpen, X, CheckCircle2, Sparkles } from 'lucide-react'

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [showVisitModal, setShowVisitModal] = useState(false)
  
  // Plan Your Visit Form State
  const [visitForm, setVisitForm] = useState({ full_name: '', phone_or_email: '', visit_date: 'This Sunday', notes: '' })
  const [visitSubmitted, setVisitSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    function calculateTimeToSunday() {
      const now = new Date()
      const nextSunday = new Date(now)
      const dayOfWeek = now.getDay()
      const daysUntilSunday = (7 - dayOfWeek) % 7
      nextSunday.setDate(now.getDate() + daysUntilSunday)
      nextSunday.setHours(11, 0, 0, 0)

      if (nextSunday <= now) {
        nextSunday.setDate(nextSunday.getDate() + 7)
      }

      const diff = nextSunday - now
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }

    calculateTimeToSunday()
    const timer = setInterval(calculateTimeToSunday, 1000)
    return () => clearInterval(timer)
  }, [])

  async function handleVisitSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    await supabase.from('visit_requests').insert([visitForm])
    setSubmitting(false)
    setVisitSubmitted(true)
  }

  return (
    <div className="bg-white text-gray-800 animate-fadeIn">
      
      {/* Cinematic Hero Section with Background Image & Gradient Overlay */}
      <section className="relative bg-churchNavy text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Worship Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=2000')` }}
        ></div>
        {/* Deep Navy Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-churchNavy/80 via-churchNavy/85 to-churchNavy"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-churchGold/20 border border-churchGold/30 text-churchGold px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm">
            <Sparkles size={15} /> Welcome to Athens Nepali Church
          </span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.15]">
            Growing Together in <span className="text-churchGold">Faith, Worship,</span> and God's Word
          </h1>
          
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-gray-300 mb-10 leading-relaxed font-light">
            A welcoming Nepali Christian family in the heart of Athens, Greece. Join us every Sunday as we lift up the name of Jesus together.
          </p>

          {/* Glassmorphism Live Sunday Countdown Widget */}
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 mb-10 shadow-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-churchGold font-bold mb-3">
              Next Sunday Worship Service In
            </p>
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="bg-churchNavy/90 border border-white/10 rounded-xl py-2.5 shadow-inner">
                <span className="block text-2xl sm:text-3xl font-extrabold text-white">{timeLeft.days}</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-400">Days</span>
              </div>
              <div className="bg-churchNavy/90 border border-white/10 rounded-xl py-2.5 shadow-inner">
                <span className="block text-2xl sm:text-3xl font-extrabold text-white">{timeLeft.hours}</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-400">Hours</span>
              </div>
              <div className="bg-churchNavy/90 border border-white/10 rounded-xl py-2.5 shadow-inner">
                <span className="block text-2xl sm:text-3xl font-extrabold text-white">{timeLeft.minutes}</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-400">Mins</span>
              </div>
              <div className="bg-churchNavy/90 border border-churchGold/40 rounded-xl py-2.5 shadow-inner">
                <span className="block text-2xl sm:text-3xl font-extrabold text-churchGold">{timeLeft.seconds}</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-400">Secs</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => {
                setVisitSubmitted(false)
                setShowVisitModal(true)
              }}
              className="bg-churchGold text-churchNavy px-8 py-4 rounded-xl font-bold text-base hover:bg-yellow-400 transition-all shadow-lg hover:shadow-churchGold/30 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              Plan Your Visit <ArrowRight size={18} />
            </button>
            <Link
              to="/prayer-wall"
              className="bg-white/10 backdrop-blur-sm border border-white/25 text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-white/20 hover:border-churchGold transition-all flex items-center justify-center"
            >
              Submit a Prayer Request
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Info Bar */}
      <section className="relative z-20 -mt-8 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4">
            <div className="bg-churchNavy text-churchGold p-3.5 rounded-xl shrink-0 shadow-sm">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Sunday Worship</p>
              <p className="font-bold text-churchNavy text-base">11:00 AM – 1:00 PM</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 md:border-l md:border-gray-100 md:pl-6">
            <div className="bg-churchNavy text-churchGold p-3.5 rounded-xl shrink-0 shadow-sm">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Location</p>
              <p className="font-bold text-churchNavy text-base">Patision 11, Athens, Greece</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 md:border-l md:border-gray-100 md:pl-6">
            <div className="bg-churchNavy text-churchGold p-3.5 rounded-xl shrink-0 shadow-sm">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Fellowship & Events</p>
              <Link to="/events" className="font-bold text-churchNavy hover:text-churchGold underline text-base transition-colors">
                Explore Calendar →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-churchGold font-bold text-xs uppercase tracking-[0.2em]">Who We Are</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-churchNavy mt-2">Our Heart & Mission</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            From a small living-room prayer gathering in November 2025 to a growing family of believers, we are committed to Christ-centered fellowship in Greece.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5">
            <div className="w-14 h-14 bg-churchNavy text-churchGold rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
              <Heart size={26} />
            </div>
            <h3 className="text-xl font-bold text-churchNavy mb-3">Spirit-Filled Worship</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We gather every Sunday to praise God in Nepali and English, experiencing His presence through heartfelt music, thanksgiving, and prayer.
            </p>
          </div>

          <div className="group p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5">
            <div className="w-14 h-14 bg-churchNavy text-churchGold rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
              <BookOpen size={26} />
            </div>
            <h3 className="text-xl font-bold text-churchNavy mb-3">Biblical Teaching</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Grounded in Scripture, our messages equip believers to grow spiritually and live out their faith boldly in everyday life in Athens.
            </p>
          </div>

          <div className="group p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5">
            <div className="w-14 h-14 bg-churchNavy text-churchGold rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
              <Users size={26} />
            </div>
            <h3 className="text-xl font-bold text-churchNavy mb-3">Loving Community</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Whether you are new to Greece or have lived here for years, you have a spiritual home, warm fellowship, and family waiting for you.
            </p>
          </div>
        </div>
      </section>

      {/* Scripture Banner */}
      <section className="relative bg-churchNavy text-white py-20 px-4 text-center overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <blockquote className="text-2xl sm:text-4xl font-serif italic text-churchGold mb-5 leading-snug">
            "The Lord has done great things for us, and we are filled with joy."
          </blockquote>
          <p className="text-sm uppercase tracking-[0.25em] text-gray-400 font-semibold">— Psalm 126:3</p>
        </div>
      </section>

      {/* Plan Your Visit Interactive Modal */}
      {showVisitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowVisitModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            {visitSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="mx-auto text-green-600 mb-3" size={48} />
                <h3 className="text-2xl font-bold text-churchNavy mb-2">We Can't Wait to Meet You!</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Thank you, <span className="font-bold">{visitForm.full_name}</span>. One of our elders will greet you at Patision 11 this Sunday at 11:00 AM.
                </p>
                <button
                  onClick={() => setShowVisitModal(false)}
                  className="bg-churchNavy text-churchGold font-bold px-6 py-2.5 rounded-lg text-sm"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-churchGold">First-Time Guest</span>
                <h3 className="text-2xl font-bold text-churchNavy mt-1 mb-2">Plan Your Sunday Visit</h3>
                <p className="text-xs text-gray-500 mb-6">
                  Let us know you're coming so we can welcome you personally and help with directions to Patision 11.
                </p>

                <form onSubmit={handleVisitSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={visitForm.full_name}
                      onChange={(e) => setVisitForm({ ...visitForm, full_name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-churchNavy focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Phone / WhatsApp / Email</label>
                    <input
                      type="text"
                      required
                      value={visitForm.phone_or_email}
                      onChange={(e) => setVisitForm({ ...visitForm, phone_or_email: e.target.value })}
                      placeholder="+30 69..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-churchNavy focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">When are you visiting?</label>
                    <select
                      value={visitForm.visit_date}
                      onChange={(e) => setVisitForm({ ...visitForm, visit_date: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-churchNavy focus:outline-none"
                    >
                      <option value="This Coming Sunday">This Coming Sunday (11:00 AM)</option>
                      <option value="Next Week">Next Week</option>
                      <option value="Just Inquiring">Just Inquiring</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Questions or Need Directions? (Optional)</label>
                    <textarea
                      rows={2}
                      value={visitForm.notes}
                      onChange={(e) => setVisitForm({ ...visitForm, notes: e.target.value })}
                      placeholder="e.g. Coming from Omonia Metro..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-churchNavy focus:outline-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-churchNavy text-churchGold font-bold py-3 rounded-lg hover:bg-opacity-95 transition-colors text-sm"
                  >
                    {submitting ? 'Confirming...' : 'Confirm My Visit'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}