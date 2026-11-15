import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../services/supabaseClient'

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(Boolean(isSupabaseConfigured))

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    if (!isSupabaseConfigured || !supabase) {
      setEvents([])
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true })

      if (error) throw error
      setEvents(data || [])
    } catch (err) {
      console.error('Error fetching events:', err?.message || err)
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="text-churchGold font-semibold text-sm uppercase tracking-wider">Stay Connected</span>
          <h1 className="text-4xl font-extrabold text-churchNavy mt-2 mb-4">Upcoming Events</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us for special gatherings, prayer meetings, and community celebrations.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-12">Loading events...</p>
        ) : events.length === 0 ? (
          <div className="text-center bg-gray-50 rounded-2xl p-12 border border-gray-100">
            <Calendar className="mx-auto text-churchGold mb-4" size={48} />
            <h3 className="text-xl font-bold text-churchNavy mb-2">No Special Events Scheduled Yet</h3>
            <p className="text-gray-600 text-sm">
              Please check back soon for updates on upcoming church programs and gatherings!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {event.image_url && (
                  <img src={event.image_url} alt={event.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-churchGold text-xs font-semibold mb-2">
                    <Calendar size={14} />
                    <span>{new Date(event.event_date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-xl font-bold text-churchNavy mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{event.description}</p>
                  <div className="flex items-center text-xs text-gray-500 space-x-4 pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-1"><MapPin size={14} /> {event.location || 'Patision 11, Athens'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}