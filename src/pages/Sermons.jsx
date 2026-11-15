import React, { useEffect, useState } from 'react'
import { BookOpen, CalendarDays, UserRound, Video } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../services/supabaseClient'

function getEmbedUrl(url) {
  if (!url) return null
  if (url.includes('embed')) return url
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([A-Za-z0-9_-]{11})/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : null
}

export default function Sermons() {
  const [sermons, setSermons] = useState([])
  const [loading, setLoading] = useState(Boolean(isSupabaseConfigured))

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false)
      return
    }

    async function fetchSermons() {
      try {
        const { data, error } = await supabase.from('sermons').select('*').order('sermon_date', { ascending: false })
        if (error) throw error
        setSermons(data || [])
      } catch (error) {
        console.error('Error fetching sermons:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSermons()
  }, [])

  return (
    <div className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-churchGold">Spiritual nourishment</p>
          <h1 className="mt-3 text-4xl font-extrabold text-churchNavy sm:text-5xl">Sermons & Messages</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Listen to the Word of God and grow in faith through biblical teaching from our worship gatherings.
          </p>
        </div>

        {loading ? (
          <div className="mt-12 text-center text-slate-500">Loading sermons...</div>
        ) : sermons.length === 0 ? (
          <div className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-12 text-center shadow-sm">
            <BookOpen className="mx-auto text-churchGold" size={52} />
            <h3 className="mt-5 text-2xl font-bold text-churchNavy">No sermons are available yet</h3>
            <p className="mt-3 text-slate-600">New sermon messages will appear here when they are added through the admin dashboard.</p>
          </div>
        ) : (
          <div className="mt-16 space-y-8">
            {sermons.map((sermon) => {
              const embedUrl = getEmbedUrl(sermon.media_url)
              return (
                <div key={sermon.id} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm lg:grid lg:grid-cols-2">
                  <div className="min-h-[280px] bg-churchNavy">
                    {embedUrl ? (
                      <iframe src={embedUrl} title={sermon.title} className="h-full w-full" allowFullScreen />
                    ) : (
                      <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center text-slate-300">
                        <Video size={52} className="mb-4 text-churchGold" />
                        <p className="text-lg font-semibold">Audio / Message</p>
                      </div>
                    )}
                  </div>

                  <div className="p-8">
                    <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-2 font-semibold text-churchNavy">
                        <UserRound size={16} className="text-churchGold" /> {sermon.speaker}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays size={16} className="text-churchGold" /> {sermon.sermon_date}
                      </span>
                    </div>

                    <h2 className="text-3xl font-bold text-churchNavy">{sermon.title}</h2>
                    <p className="mt-4 text-base leading-7 text-slate-600">{sermon.description}</p>

                    {sermon.media_url && !embedUrl && (
                      <a href={sermon.media_url} target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-xl bg-churchNavy px-5 py-3 text-sm font-bold text-churchGold">Open media</a>
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
