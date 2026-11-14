import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="text-churchGold font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
          <h1 className="text-4xl font-extrabold text-churchNavy mt-2 mb-4">Contact Us & Prayer Requests</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We would love to hear from you. Reach out with questions or share your prayer requests with our leadership team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <h3 className="text-2xl font-bold text-churchNavy mb-6">Church Information</h3>
              <ul className="space-y-6 text-gray-600">
                <li className="flex items-start space-x-4">
                  <div className="bg-churchNavy text-churchGold p-3 rounded-lg shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-churchNavy">Address</p>
                    <p className="text-sm">Patision 11, Athens, Greece</p>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <div className="bg-churchNavy text-churchGold p-3 rounded-lg shrink-0">
                    <Clock size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-churchNavy">Worship Time</p>
                    <p className="text-sm">Sunday: 11:00 AM – 1:00 PM</p>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <div className="bg-churchNavy text-churchGold p-3 rounded-lg shrink-0">
                    <Phone size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-churchNavy">Leadership Contacts</p>
                    <p className="text-sm font-medium">Sagar Sunar (Elder): <a href="tel:+306949651076" className="text-churchNavy underline">+30 694 965 1076</a></p>
                    <p className="text-sm font-medium mt-1">Joseph Tiruwa (Elder): <a href="tel:+306972366505" className="text-churchNavy underline">+30 697 236 6505</a></p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact / Prayer Request Form */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <h3 className="text-2xl font-bold text-churchNavy mb-6">Send Us a Message</h3>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl text-center">
                <h4 className="font-bold text-lg mb-1">Thank You!</h4>
                <p className="text-sm">Your message or prayer request has been received. Our leadership team will be praying for you.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-churchNavy text-sm"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Phone or Email</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-churchNavy text-sm"
                    placeholder="Phone number or email address"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Message / Prayer Request</label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-churchNavy text-sm"
                    placeholder="How can we pray for you or help you?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-churchNavy text-churchGold font-bold py-3.5 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={18} /> Send Message
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}