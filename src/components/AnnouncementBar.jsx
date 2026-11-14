import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { Megaphone, X } from 'lucide-react'

export default function AnnouncementBar() {
  const [announcement, setAnnouncement] = useState(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    fetchLatestAnnouncement()
  }, [])

  async function fetchLatestAnnouncement() {
    const { data } = await supabase
      .from('announcements')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (data) setAnnouncement(data)
  }

  if (!announcement || dismissed) return null

  return (
    <div className="bg-churchGold text-churchNavy px-4 py-2 text-xs sm:text-sm font-semibold relative">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 pr-6 text-center">
        <Megaphone className="shrink-0" size="{16}"/>
        <span>{announcement.message}</span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70"
        aria-label="Dismiss announcement"
      >
        <X size="{16}"/>
      </button>
    </div>
  )
}