import React, { useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { Calendar, User, Phone, FileText, CheckCircle, Sparkles, Send, Clock, Video, MapPin } from 'lucide-react'

export default function PlanVisit() {
  const [formData, setFormData] = useState({
    full_name: '',
    phone_or_email: '',
    visit_date: '',
    notes: ''
  })
  const [selectedService, setSelectedService] = useState('Sunday Worship Service (11:00 AM - 1:00 PM)')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const combinedNotes = `Service: ${selectedService}${formData.notes ? ` | Notes: ${formData.notes}` : ''}`

    const { error: insertError } = await supabase
      .from('visit_requests')
      .insert([{
        full_name: formData.full_name,
        phone_or_email: formData.phone_or_email,
        visit_date: formData.visit_date,
        notes: combinedNotes
      }])

    if (insertError) {
      console.error('Error submitting visit request:', insertError)
      setError('Failed to submit your request. Please try again.')
    } else {
      setSuccess(true)
      setFormData({ full_name: '', phone_or_email: '', visit_date: '', notes: '' })
      setTimeout(() => setSuccess(false), 6000)
    }
    setSubmitting(false)
  }

  return (
    <div className="bg-gray-50 text-gray-800 animate-fadeIn pb-20">
      
      {/* Hero Header */}
      <section className="bg-churchNavy text-white py-24 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-churchGold/20 border border-churchGold/30 text-churchGold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles size={14} /> Join Our Fellowship
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Plan Your Visit
          </h1>
          <p className="text-lg text-gray-300 font-light">
            Whether in-person on Sunday or joining our weekly Google Meet sessions, we would love to connect with you!
          </p>
        </div>
      </section>

      {/* Weekly Gatherings Info Cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Sunday Service */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-churchNavy text-churchGold px-3 py-1 rounded-full mb-3">
                <MapPin size={12} /> In-Person
              </span>
              <h3 className="text-lg font-bold text-churchNavy">Sunday Worship Service</h3>
              <p className="text-sm text-gray-600 mt-1 flex items-center gap-1.5 font-medium">
                <Clock size={15} className="text-churchGold" /> Sunday: 11:00 AM – 1:00 PM
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
              Main church gathering in Athens, Greece.
            </p>
          </div>

          {/* Monday Online Fellowship */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-3 py-1 rounded-full mb-3">
                <Video size={12} /> Google Meet Online
              </span>
              <h3 className="text-lg font-bold text-churchNavy">Online Fellowship</h3>
              <p className="text-sm text-gray-600 mt-1 flex items-center gap-1.5 font-medium">
                <Clock size={15} className="text-churchGold" /> Monday: 8:00 PM – 9:00 PM
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
              Prayer & sharing together via Google Meet.
            </p>
          </div>

          {/* Thursday Bible Study */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-3 py-1 rounded-full mb-3">
                <Video size={12} /> Google Meet Online
              </span>
              <h3 className="text-lg font-bold text-churchNavy">Online Bible Study</h3>
              <p className="text-sm text-gray-600 mt-1 flex items-center gap-1.5 font-medium">
                <Clock size={15} className="text-churchGold" /> Thursday: 7:30 PM – 9:00 PM
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
              Deepening our faith in God's Word via Google Meet.
            </p>
          </div>

        </div>
      </section>

      {/* Form Card */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold text-churchNavy mb-2">Guest RSVP & Meeting Link Request</h2>
          <p className="text-sm text-gray-500 mb-6">
            Select which gathering you'd like to join, and our team will reach out with directions or the Google Meet link.
          </p>

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-2 text-sm">
              <CheckCircle size={18} /> Thank you! We will send you the details and look forward to welcoming you.
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Which Gathering Would You Like to Join?
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-churchGold text-sm bg-white"
              >
                <option value="Sunday Worship Service (11:00 AM - 1:00 PM)">
                  Sunday Worship Service (11:00 AM – 1:00 PM) - In-Person
                </option>
                <option value="Monday Online Fellowship (8:00 PM - 9:00 PM)">
                  Monday Online Fellowship (8:00 PM – 9:00 PM) - Google Meet
                </option>
                <option value="Thursday Bible Study (7:30 PM - 9:00 PM)">
                  Thursday Bible Study (7:30 PM – 9:00 PM) - Google Meet
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5 flex items-center gap-1.5">
                <User size={14} className="text-churchGold" /> Full Name
              </label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-churchGold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5 flex items-center gap-1.5">
                <Phone size={14} className="text-churchGold" /> Phone Number (WhatsApp/Viber) or Email
              </label>
              <input
                type="text"
                required
                value={formData.phone_or_email}
                onChange={(e) => setFormData({ ...formData, phone_or_email: e.target.value })}
                placeholder="e.g., +30 69... or email@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-churchGold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5 flex items-center gap-1.5">
                <Calendar size={14} className="text-churchGold" /> Date You Plan to Join
              </label>
              <input
                type="date"
                required
                value={formData.visit_date}
                onChange={(e) => setFormData({ ...formData, visit_date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-churchGold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5 flex items-center gap-1.5">
                <FileText size={14} className="text-churchGold" /> Additional Notes (Optional)
              </label>
              <textarea
                rows="3"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Need the Google Meet link? Coming with family? Let us know..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-churchGold text-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-churchNavy text-churchGold hover:bg-opacity-95 font-bold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send size={18} /> {submitting ? 'Submitting...' : 'Confirm & Request Details'}
            </button>
          </form>
        </div>
      </section>

    </div>
  )
}