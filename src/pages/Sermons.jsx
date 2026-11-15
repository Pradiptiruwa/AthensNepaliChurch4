import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { BookOpen, Video, User, Calendar, Sparkles } from 'lucide-react'

export default function Sermons() {
  const [sermons, setSermons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSermons()
  }, [])

  async function fetchSermons() {
    const { data } = await supabase
      .from('sermons')
      .select('*')
      .order('sermon_date', { ascending: false })
    setSermons(data || [])
    setLoading(false)
  }

  return (
    <div className="bg-white text-gray-800 animate-fadeIn pb-20">
      
      {/* Header */}
      <section className="relative bg-churchNavy text-white py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=2000')` }}></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-churchGold/20 border border-churchGold/30 text-churchGold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size="{14}"/> Biblical Teachings
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Sermon Repository</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
            Listen to life-changing messages and biblical teachings from our Sunday worship services.
          </p>
        </div>
      </section>

      {/* Sermons Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading sermons...</div>
        ) : sermons.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100 max-w-xl mx-auto">
            <BookOpen className="mx-auto text-gray-400 mb-3" size="{48}"/>
            <h3 className="text-xl font-bold text-churchNavy mb-1">No Sermons Available</h3>
            <p className="text-sm text-gray-500">Sermons will appear here once added from the Admin Dashboard.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sermons.map((sm) => (
              <div key={sm.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs font-bold text-churchGold bg-churchNavy/5 px-3 py-1 rounded-full w-max mb-3">
                    <Calendar size="{13}"/> {sm.sermon_date}
                  </div>
                  <h3 className="text-xl font-bold text-churchNavy mb-2">{sm.title}</h3>
                  <p className="text-xs font-semibold text-gray-500 flex items-center gap-1.5 mb-4">
                    <User className="text-churchGold" size="{14}"/> Speaker: {sm.speaker}
                  </p>
                  <p className="text-gray-600 text-sm mb-6 flex-grow">{sm.description}</p>
                  
                  {sm.media_url && (
                    <a 
                      href={sm.media_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-auto w-full bg-churchNavy text-churchGold font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs hover:bg-opacity-90 transition-colors shadow-sm"
                    >
                      <Video size="{15}"/> Watch Sermon / Video
                    </a>
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