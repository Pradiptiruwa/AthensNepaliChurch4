import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { BookOpen, Video, User, Calendar } from 'lucide-react'

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

  // Helper to convert standard YouTube links to embed format
  function getEmbedUrl(url) {
    if (!url) return null
    if (url.includes('embed')) return url
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="text-churchGold font-semibold text-sm uppercase tracking-wider bg-churchNavy/5 px-4 py-1.5 rounded-full">
            Spiritual Nourishment
          </span>
          <h1 className="text-4xl font-extrabold text-churchNavy mt-3 mb-4">Sermons & Messages</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Listen or watch life-changing biblical messages from our Sunday worship gatherings.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-20">Loading sermons...</p>
        ) : sermons.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-2xl border border-gray-200 max-w-md mx-auto">
            <BookOpen className="mx-auto text-churchGold mb-3" size={48} />
            <h3 className="text-lg font-bold text-churchNavy">No sermons posted yet</h3>
            <p className="text-sm text-gray-500 mt-1">Add sermons with YouTube links via your Admin Dashboard.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {sermons.map((sermon) => {
              const embedUrl = getEmbedUrl(sermon.media_url)
              return (
                <div key={sermon.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                  
                  {/* Video Embed or Placeholder */}
                  <div className="bg-churchNavy min-h-[280px] flex items-center justify-center relative">
                    {embedUrl ? (
                      <iframe
                        src={embedUrl}
                        title={sermon.title}
                        className="w-full h-full absolute inset-0"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div className="text-center p-6 text-gray-400">
                        <Video size={48} className="mx-auto text-churchGold mb-2" />
                        <p className="text-sm font-medium">Audio / Text Message</p>
                      </div>
                    )}
                  </div>

                  {/* Sermon Details */}
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1 font-semibold text-churchNavy">
                          <User size={14} className="text-churchGold" /> {sermon.speaker}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} /> {sermon.sermon_date}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-churchNavy mb-3">{sermon.title}</h2>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {sermon.description || 'Join us as we explore the truths of God\'s Word and apply them to our daily lives in Greece.'}
                      </p>
                    </div>

                    {sermon.media_url && !embedUrl && (
                      <a
                        href={sermon.media_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-churchNavy text-churchGold px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-opacity-90 w-fit"
                      >
                        Listen / Open Recording
                      </a>
                    )}
                  </div>

                </div>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}