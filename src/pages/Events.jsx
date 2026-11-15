import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { Calendar, MapPin, Clock, Sparkles } from 'lucide-react'

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    const { data } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true })
    setEvents(data || [])
    setLoading(false)
  }

  return (
    <div className="bg-white text-gray-800 animate-fadeIn pb-20">
      
      {/* Header */}
      <section className="relative bg-churchNavy text-white py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=2000')` }}></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-churchGold/20 border border-churchGold/30 text-churchGold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={14} /> Stay Connected
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Upcoming Events</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
            Join us for special gatherings, prayer meetings, fasting programs, and community celebrations.
          </p>
        </div>
      </section>

      {/* Events List Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100 max-w-xl mx-auto">
            <Calendar className="mx-auto text-gray-400 mb-3" size={48} />
            <h3 className="text-xl font-bold text-churchNavy mb-1">No Upcoming Events</h3>
            <p className="text-sm text-gray-500">Check back soon for upcoming church gatherings and announcements!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((ev) => (
              <div key={ev.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                {ev.image_url ? (
                  <img src={ev.image_url} alt={ev.title} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-36 bg-churchNavy flex items-center justify-center text-churchGold">
                    <Calendar size={40} />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs font-bold text-churchGold bg-churchNavy/5 px-3 py-1 rounded-full w-max mb-3">
                    <Clock size={13} /> {new Date(ev.event_date).toLocaleString()}
                  </div>
                  <h3 className="text-xl font-bold text-churchNavy mb-2">{ev.title}</h3>
                  <p className="text-gray-600 text-sm mb-6 flex-grow">{ev.description}</p>
                  {ev.location && (
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 border-t border-gray-100 pt-4 mt-auto">
                      <MapPin size={15} className="text-churchGold shrink-0" /> {ev.location}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  )
}