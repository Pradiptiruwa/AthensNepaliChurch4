import React, { useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { MapPin, Phone, Clock, Send, CheckCircle2 } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({ sender_name: '', contact_info: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    await supabase.from('contact_messages').insert([formData])
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="text-churchGold font-bold text-xs uppercase tracking-[0.2em]">Get in Touch</span>
          <h1 className="text-4xl font-extrabold text-churchNavy mt-2 mb-4">Contact Us & Directions</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We would love to hear from you. Reach out with questions, prayer needs, or visit us this Sunday in the heart of Athens.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-churchNavy mb-6">Church Information</h3>
              <ul className="space-y-6 text-gray-600">
                <li className="flex items-start space-x-4">
                  <div className="bg-churchNavy text-churchGold p-3.5 rounded-xl shrink-0 shadow-sm">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-churchNavy">Address</p>
                    <p className="text-sm">Patision 11, Athens 104 31, Greece</p>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <div className="bg-churchNavy text-churchGold p-3.5 rounded-xl shrink-0 shadow-sm">
                    <Clock size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-churchNavy">Worship Time</p>
                    <p className="text-sm">Sunday: 11:00 AM – 1:00 PM</p>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <div className="bg-churchNavy text-churchGold p-3.5 rounded-xl shrink-0 shadow-sm">
                    <Phone size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-churchNavy">Leadership Contacts</p>
                    <p className="text-sm font-medium">Sagar Sunar (Elder): <a href="tel:+306949651076" className="text-churchNavy underline hover:text-churchGold">+30 694 965 1076</a></p>
                    <p className="text-sm font-medium mt-1">Joseph Tiruwa (Elder): <a href="tel:+306972366505" className="text-churchNavy underline hover:text-churchGold">+30 697 236 6505</a></p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-bold text-churchNavy mb-6">Send Us a Message</h3>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-900 p-8 rounded-2xl text-center">
                <CheckCircle2 className="mx-auto text-green-600 mb-3" size={44} />
                <h4 className="font-bold text-xl mb-1">Thank You!</h4>
                <p className="text-sm text-green-800">Your message has been saved and sent to our church leadership team.</p>
                <button 
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ sender_name: '', contact_info: '', message: '' })
                  }}
                  className="mt-4 text-xs font-bold underline text-churchNavy"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.sender_name}
                    onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-churchNavy text-sm"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Phone, WhatsApp, or Email</label>
                  <input
                    type="text"
                    required
                    value={formData.contact_info}
                    onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-churchNavy text-sm"
                    placeholder="+30 69... or email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-churchNavy text-sm"
                    placeholder="How can we help or pray for you?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-churchNavy text-churchGold font-bold py-3.5 rounded-xl hover:bg-opacity-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={18} /> {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Interactive Google Map */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-96">
          <iframe
            title="Athens Nepali Church Map"
            src="https://www.google.com/maps?q=Patision+11,+Athens,+Greece&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </div>
  )
}