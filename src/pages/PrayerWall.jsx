import React, { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../services/supabaseClient'
import { HeartHandshake, Send, CheckCircle2 } from 'lucide-react'

export default function PrayerWall() {
  const [prayers, setPrayers] = useState([])
  const [loading, setLoading] = useState(Boolean(isSupabaseConfigured))
  const [name, setName] = useState('')
  const [requestText, setRequestText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [prayedIds, setPrayedIds] = useState([])

  useEffect(() => {
    fetchApprovedPrayers()
  }, [])

  async function fetchApprovedPrayers() {
    if (!isSupabaseConfigured || !supabase) {
      setPrayers([])
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('prayer_requests')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPrayers(data || [])
    } catch (error) {
      console.error('Error fetching prayer requests:', error)
      setPrayers([])
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!isSupabaseConfigured || !supabase) {
      setName('')
      setRequestText('')
      setSubmitted(true)
      return
    }

    await supabase.from('prayer_requests').insert([
      { author_name: name || 'Anonymous', request_text: requestText, is_approved: false }
    ])
    setName('')
    setRequestText('')
    setSubmitted(true)
  }

  async function handlePrayClick(prayer) {
    if (prayedIds.includes(prayer.id) || !isSupabaseConfigured || !supabase) return

    const newCount = (prayer.pray_count || 0) + 1
    setPrayedIds([...prayedIds, prayer.id])
    setPrayers(prayers.map(p => p.id === prayer.id ? { ...p, pray_count: newCount } : p))

    await supabase
      .from('prayer_requests')
      .update({ pray_count: newCount })
      .eq('id', prayer.id)
  }

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-14">
          <span className="text-churchGold font-semibold text-sm uppercase tracking-wider">Standing Together in Faith</span>
          <h1 className="text-4xl font-extrabold text-churchNavy mt-2 mb-4">Church Prayer Wall</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Share your prayer burdens with our church family and lift up others in prayer throughout the week.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Submit Form */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 h-fit">
            <h2 className="text-xl font-bold text-churchNavy mb-4">Submit a Prayer Request</h2>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl text-sm">
                <p className="font-bold flex items-center gap-1.5 mb-1"><CheckCircle2 size={16} /> Request Received</p>
                <p>Our elders will review your request shortly before posting it publicly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs font-bold underline text-green-900"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Your Name (Optional)</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Sita or Anonymous"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Prayer Need</label>
                  <textarea
                    rows={4}
                    required
                    value={requestText}
                    onChange={(e) => setRequestText(e.target.value)}
                    placeholder="How can our church pray for you?"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-churchNavy text-churchGold font-bold py-3 rounded-lg hover:bg-opacity-90 flex items-center justify-center gap-2 text-sm"
                >
                  <Send size={16} /> Share Request
                </button>
              </form>
            )}
          </div>

          {/* Public Prayer Feed */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <p className="text-gray-500 text-center py-8">Loading prayer requests...</p>
            ) : prayers.length === 0 ? (
              <div className="bg-gray-50 p-10 rounded-2xl text-center border border-gray-100">
                <HeartHandshake className="mx-auto text-churchGold mb-3" size={40} />
                <p className="font-bold text-churchNavy">No public prayer requests yet.</p>
                <p className="text-sm text-gray-500 mt-1">Be the first to share a request with the congregation.</p>
              </div>
            ) : (
              prayers.map((prayer) => {
                const hasPrayed = prayedIds.includes(prayer.id)
                return (
                  <div key={prayer.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-churchNavy">{prayer.author_name}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(prayer.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{prayer.request_text}</p>
                    <button
                      onClick={() => handlePrayClick(prayer)}
                      disabled={hasPrayed}
                      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                        hasPrayed
                          ? 'bg-churchGold/20 text-churchNavy cursor-default'
                          : 'bg-churchNavy text-churchGold hover:bg-opacity-90'
                      }`}
                    >
                      <HeartHandshake size={14} />
                      {hasPrayed ? 'Prayed' : 'I Prayed'} ({prayer.pray_count || 0})
                    </button>
                  </div>
                )
              })
            )}
          </div>

        </div>
      </div>
    </div>
  )
}