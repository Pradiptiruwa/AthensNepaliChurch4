import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { HeartHandshake, Sparkles, Send, Heart } from 'lucide-react'

export default function PrayerWall() {
  const [prayers, setPrayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [authorName, setAuthorName] = useState('')
  const [requestText, setRequestText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    fetchApprovedPrayers()
  }, [])

  async function fetchApprovedPrayers() {
    const { data } = await supabase
      .from('prayer_requests')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
    setPrayers(data || [])
    setLoading(false)
  }

  async function handleSubmitPrayer(e) {
    e.preventDefault()
    if (!authorName.trim() || !requestText.trim()) return

    setSubmitting(true)
    const { error } = await supabase.from('prayer_requests').insert([{
      author_name: authorName,
      request_text: requestText,
      is_approved: false // Admin approval पछि मात्र देखा पर्छ
    }])

    setSubmitting(false)
    if (!error) {
      setAuthorName('')
      setRequestText('')
      setSuccessMsg('Your prayer request has been submitted successfully and is awaiting review.')
    } else {
      alert('Error submitting request: ' + error.message)
    }
  }

  return (
    <div className="bg-white text-gray-800 animate-fadeIn pb-20">
      
      {/* Header */}
      <section className="relative bg-churchNavy text-white py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=2000')` }}></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-churchGold/20 border border-churchGold/30 text-churchGold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size="{14}"/> Power of Prayer
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Prayer Wall</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
            Share your prayer requests with our community, and let us join together in faith to pray for you.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Submit Prayer Form */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm h-fit">
            <div className="w-12 h-12 bg-churchNavy text-churchGold rounded-xl flex items-center justify-center mb-4 shadow-md">
              <HeartHandshake size="{24}"/>
            </div>
            <h2 className="text-2xl font-bold text-churchNavy mb-2">Submit Prayer Request</h2>
            <p className="text-gray-600 text-sm mb-6">Let our community support you in prayer.</p>

            {successMsg && (
              <div className="bg-green-50 text-green-800 p-4 rounded-xl text-xs font-medium mb-6 border border-green-100">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmitPrayer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Your Name</label>
                <input 
                  type="text" 
                  value={authorName} 
                  onChange={(e) => setAuthorName(e.target.value)} 
                  required 
                  placeholder="Enter your name" 
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Prayer Request</label>
                <textarea 
                  value={requestText} 
                  onChange={(e) => setRequestText(e.target.value)} 
                  required 
                  rows={4} 
                  placeholder="Write your prayer request here..." 
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm" 
                />
              </div>
              <button
  type="submit"
  className="w-full bg-churchNavy text-churchGold hover:bg-churchNavy/90 font-bold py-3 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
>
  <Send size={18} />
  <span>Send Prayer Request</span>
</button>
            </form>
          </div>

          {/* Approved Prayer Wall Grid */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-churchNavy mb-4">Community Prayer Wall</h2>
            
            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading prayers...</div>
            ) : prayers.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100 p-8">
                <Heart className="mx-auto text-gray-400 mb-3" size="{40}"/>
                <h3 className="text-lg font-bold text-churchNavy mb-1">No Prayer Requests Yet</h3>
                <p className="text-sm text-gray-500">Be the first to share a prayer request using the form.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {prayers.map((pr) => (
                  <div key={pr.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-churchNavy text-sm bg-churchNavy/5 px-3 py-1 rounded-full text-churchNavy">
                        {pr.author_name}
                      </span>
                      <span className="text-[10px] text-gray-400">{new Date(pr.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{pr.request_text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  )
}