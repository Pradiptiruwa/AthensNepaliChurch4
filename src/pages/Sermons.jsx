import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { BookOpen, User, Calendar, Video } from 'lucide-react'

export default function Sermons() {
  const [sermons, setSermons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSermons()
  }, [])

  async function fetchSermons() {
    try {
      const { data, error } = await supabase
        .from('sermons')
        .select('*')
        .order('sermon_date', { ascending: false })
      
      if (error) throw error
      setSermons(data || [])
    } catch (err) {
      console.error('Error fetching sermons:', err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="text-churchGold font-semibold text-sm uppercase tracking-wider">God's Living Word</span>
          <h1 className="text-4xl font-extrabold text-churchNavy mt-2 mb-4">Sermons & Messages</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Listen to past preaching and messages shared during our Sunday worship services.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-12">Loading sermons...</p>
        ) : sermons.length === 0 ? (
          <div className="text-center bg-gray-50 rounded-2xl p-12 border border-gray-100">
            <BookOpen className="mx-auto text-churchGold mb-4" size={48} />
            <h3 className="text-xl font-bold text-churchNavy mb-2">No Sermons Posted Yet</h3>
            <p className="text-gray-600 text-sm">
              Sermon recordings and outlines will appear here soon!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {sermons.map((sermon) => (
              <div key={sermon.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <div className="flex items-center space-x-4 text-xs font-semibold text-gray-500 mb-2">
                    <span className="flex items-center gap-1 text-churchGold"><Calendar size={14} /> {new Date(sermon.sermon_date).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><User size={14} /> {sermon.speaker}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-churchNavy mb-2">{sermon.title}</h3>
                  <p className="text-gray-600 text-sm max-w-2xl leading-relaxed">{sermon.description}</p>
                </div>
                {sermon.media_url && (
                  <a
                    href={sermon.media_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 bg-churchNavy text-churchGold px-5 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-opacity-90 transition-colors"
                  >
                    <Video size={18} /> Watch / Listen
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}