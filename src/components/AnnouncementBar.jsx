import React, { useEffect, useState } from 'react'
import { Megaphone, X } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../services/supabaseClient'

export default function AnnouncementBar() {
  const [announcement, setAnnouncement] = useState(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return
    }

    async function fetchLatestAnnouncement() {
      try {
        const { data } = await supabase
          .from('announcements')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (data) setAnnouncement(data)
      } catch (error) {
        console.error('Error fetching announcement:', error)
      }
    }

    fetchLatestAnnouncement()
  }, [])

  if (!announcement || dismissed) return null

  return (
    <div className="bg-churchGold text-churchNavy px-4 py-2 text-xs font-semibold sm:text-sm">
      <div className="page-shell relative flex items-center justify-center gap-2 pr-8 text-center">
        <Megaphone size={16} />
        <span>{announcement.message}</span>
      </div>
      <button type="button" onClick={() => setDismissed(true)} className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70" aria-label="Dismiss announcement">
        <X size={16} />
      </button>
    </div>
  )
}
