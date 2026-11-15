import React, { useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { Mail, Phone, MapPin, Send, Sparkles, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const { error: insertError } = await supabase
      .from('contact_messages')
      .insert([formData])

    if (insertError) {
      console.error('Error sending message:', insertError)
      setError('Failed to send message. Please try again.')
    } else {
      setSuccess(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => setSuccess(false), 5000)
    }
    setSubmitting(false)
  }

  return (
    <div className="bg-gray-50 text-gray-800 animate-fadeIn pb-20">
      
      {/* Header / Hero Section */}
      <section className="bg-churchNavy text-white py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-churchGold/20 border border-churchGold/30 text-churchGold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles size={14}/> Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Contact Athens Nepali Church
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
            We would love to hear from you. Reach out to us for fellowship, prayers, or any queries.
          </p>
        </div>
      </section>

      {/* Main Content: Info & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards */}
          <div className="space-y-6 lg:col-span-1">
            
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-start gap-4">
              <div className="bg-churchGold/10 text-churchGold p-3 rounded-xl">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-churchNavy mb-1">Our Location</h3>
                <p className="text-gray-600 text-sm">Athens, Greece</p>
                <p className="text-gray-400 text-xs mt-1">Join us for our Sunday Worship Service</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-start gap-4">
              <div className="bg-churchGold/10 text-churchGold p-3 rounded-xl">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-churchNavy mb-1">Phone Number</h3>
                <p className="text-gray-600 text-sm">+30 [Church Contact No]</p>
                <p className="text-gray-400 text-xs mt-1">Mon - Sat (9:00 AM - 6:00 PM)</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-start gap-4">
              <div className="bg-churchGold/10 text-churchGold p-3 rounded-xl">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-churchNavy mb-1">Email Address</h3>
                <p className="text-gray-600 text-sm">athensnepalichurch@gmail.com</p>
                <p className="text-gray-400 text-xs mt-1">We reply within 24 hours</p>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-md border border-gray-100 lg:col-span-2">
            <h2 className="text-2xl font-bold text-churchNavy mb-2">Send Us a Message</h2>
            <p className="text-gray-500 text-sm mb-6">Fill out the form below and our team in Athens will get back to you.</p>

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-2 text-sm">
                <CheckCircle size={18} /> Thank you! Your message has been sent successfully.
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-churchGold text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-churchGold text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Phone Number (Optional)</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-churchGold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Your Message</label>
                <textarea
                  required
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Write your message or inquiry here..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-churchGold text-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-churchNavy text-churchGold hover:bg-churchNavy/90 font-bold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send size={18} /> {submitting ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  )
}