import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { Lock, LogOut, Plus, Trash2, Calendar, BookOpen, Image as ImageIcon, Megaphone, HeartHandshake, Check } from 'lucide-react'

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [activeTab, setActiveTab] = useState('events')

  const [events, setEvents] = useState([])
  const [sermons, setSermons] = useState([])
  const [gallery, setGallery] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [prayers, setPrayers] = useState([])

  const [eventForm, setEventForm] = useState({ title: '', description: '', event_date: '', location: '', image_url: '' })
  const [sermonForm, setSermonForm] = useState({ title: '', speaker: '', sermon_date: '', description: '', media_url: '' })
  const [galleryForm, setGalleryForm] = useState({ title: '', category: 'Worship', image_url: '' })
  const [announcementText, setAnnouncementText] = useState('')

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession()
    setUser(session?.user || null)
    if (session?.user) {
      fetchAllData()
    }
    setLoading(false)
  }

  async function handleLogin(e) {
    e.preventDefault()
    setLoginError('')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setLoginError(error.message)
    } else {
      setUser(data.user)
      fetchAllData()
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
  }

  async function fetchAllData() {
    const { data: evData } = await supabase.from('events').select('*').order('event_date', { ascending: true })
    const { data: smData } = await supabase.from('sermons').select('*').order('sermon_date', { ascending: false })
    const { data: glData } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false })
    const { data: anData } = await supabase.from('announcements').select('*').order('created_at', { ascending: false })
    const { data: prData } = await supabase.from('prayer_requests').select('*').order('created_at', { ascending: false })

    setEvents(evData || [])
    setSermons(smData || [])
    setGallery(glData || [])
    setAnnouncements(anData || [])
    setPrayers(prData || [])
  }

  async function addEvent(e) {
    e.preventDefault()
    await supabase.from('events').insert([eventForm])
    setEventForm({ title: '', description: '', event_date: '', location: '', image_url: '' })
    fetchAllData()
  }

  async function addSermon(e) {
    e.preventDefault()
    await supabase.from('sermons').insert([sermonForm])
    setSermonForm({ title: '', speaker: '', sermon_date: '', description: '', media_url: '' })
    fetchAllData()
  }

  async function addGallery(e) {
    e.preventDefault()
    await supabase.from('gallery_images').insert([galleryForm])
    setGalleryForm({ title: '', category: 'Worship', image_url: '' })
    fetchAllData()
  }

  async function addAnnouncement(e) {
    e.preventDefault()
    if (!announcementText.trim()) return
    await supabase.from('announcements').insert([{ message: announcementText, is_active: true }])
    setAnnouncementText('')
    fetchAllData()
  }

  async function approvePrayer(id) {
    await supabase.from('prayer_requests').update({ is_approved: true }).eq('id', id)
    fetchAllData()
  }

  async function deleteItem(table, id) {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await supabase.from(table).delete().eq('id', id)
      fetchAllData()
    }
  }

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>
  }

  if (!user) {
    return (
      <div className="bg-gray-50 min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-churchNavy text-churchGold rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock size={22} />
            </div>
            <h2 className="text-2xl font-bold text-churchNavy">Admin Portal</h2>
            <p className="text-sm text-gray-500">Sign in to manage church website content</p>
          </div>

          {loginError && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mb-4">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-churchNavy text-sm"
                placeholder="admin@athensnepalichurch.gr"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-churchNavy text-sm"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-churchNavy text-churchGold font-bold py-3.5 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header bar */}
        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-churchNavy">Church Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Logged in as {user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-3">
          <button onClick={() => setActiveTab('events')} className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'events' ? 'bg-churchNavy text-churchGold' : 'bg-white text-gray-600'}`}>Events</button>
          <button onClick={() => setActiveTab('sermons')} className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'sermons' ? 'bg-churchNavy text-churchGold' : 'bg-white text-gray-600'}`}>Sermons</button>
          <button onClick={() => setActiveTab('gallery')} className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'gallery' ? 'bg-churchNavy text-churchGold' : 'bg-white text-gray-600'}`}>Gallery</button>
          <button onClick={() => setActiveTab('announcements')} className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'announcements' ? 'bg-churchNavy text-churchGold' : 'bg-white text-gray-600'}`}>Announcements</button>
          <button onClick={() => setActiveTab('prayers')} className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'prayers' ? 'bg-churchNavy text-churchGold' : 'bg-white text-gray-600'}`}>
            Prayer Wall ({prayers.filter(p => !p.is_approved).length} Pending)
          </button>
        </div>

        {/* Tab 1: Events */}
        {activeTab === 'events' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-churchNavy mb-4 flex items-center gap-2"><Calendar size={20} /> Add New Event</h3>
              <form onSubmit={addEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Event Title" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} required className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm" />
                <input type="datetime-local" value={eventForm.event_date} onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })} required className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm" />
                <input type="text" placeholder="Location (e.g. Patision 11)" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm" />
                <input type="text" placeholder="Image URL (optional)" value={eventForm.image_url} onChange={(e) => setEventForm({ ...eventForm, image_url: e.target.value })} className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm" />
                <textarea placeholder="Event Description" value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} rows={2} className="md:col-span-2 px-4 py-2.5 rounded-lg border border-gray-300 text-sm"></textarea>
                <button type="submit" className="md:col-span-2 bg-churchNavy text-churchGold font-bold py-3 rounded-lg flex items-center justify-center gap-2"><Plus size={18} /> Add Event</button>
              </form>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-churchNavy mb-4">Existing Events</h3>
              <div className="space-y-3">
                {events.map((ev) => (
                  <div key={ev.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div>
                      <p className="font-bold text-churchNavy">{ev.title}</p>
                      <p className="text-xs text-gray-500">{new Date(ev.event_date).toLocaleString()} • {ev.location}</p>
                    </div>
                    <button onClick={() => deleteItem('events', ev.id)} className="text-red-600 hover:text-red-800 p-2"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Sermons */}
        {activeTab === 'sermons' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-churchNavy mb-4 flex items-center gap-2"><BookOpen size={20} /> Add New Sermon</h3>
              <form onSubmit={addSermon} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Sermon Title" value={sermonForm.title} onChange={(e) => setSermonForm({ ...sermonForm, title: e.target.value })} required className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm" />
                <input type="text" placeholder="Speaker Name" value={sermonForm.speaker} onChange={(e) => setSermonForm({ ...sermonForm, speaker: e.target.value })} required className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm" />
                <input type="date" value={sermonForm.sermon_date} onChange={(e) => setSermonForm({ ...sermonForm, sermon_date: e.target.value })} required className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm" />
                <input type="text" placeholder="Media URL (YouTube link etc.)" value={sermonForm.media_url} onChange={(e) => setSermonForm({ ...sermonForm, media_url: e.target.value })} className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm" />
                <textarea placeholder="Sermon Summary / Description" value={sermonForm.description} onChange={(e) => setSermonForm({ ...sermonForm, description: e.target.value })} rows={2} className="md:col-span-2 px-4 py-2.5 rounded-lg border border-gray-300 text-sm"></textarea>
                <button type="submit" className="md:col-span-2 bg-churchNavy text-churchGold font-bold py-3 rounded-lg flex items-center justify-center gap-2"><Plus size={18} /> Add Sermon</button>
              </form>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-churchNavy mb-4">Existing Sermons</h3>
              <div className="space-y-3">
                {sermons.map((sm) => (
                  <div key={sm.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div>
                      <p className="font-bold text-churchNavy">{sm.title} <span className="text-xs font-normal text-gray-500">({sm.speaker})</span></p>
                      <p className="text-xs text-gray-500">{sm.sermon_date}</p>
                    </div>
                    <button onClick={() => deleteItem('sermons', sm.id)} className="text-red-600 hover:text-red-800 p-2"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Gallery */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-churchNavy mb-4 flex items-center gap-2"><ImageIcon size={20} /> Add Photo to Gallery</h3>
              <form onSubmit={addGallery} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" placeholder="Photo Title / Caption" value={galleryForm.title} onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })} className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm" />
                <select value={galleryForm.category} onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })} className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm">
                  <option value="Worship">Worship</option>
                  <option value="Prayer">Prayer</option>
                  <option value="Fellowship">Fellowship</option>
                  <option value="Celebrations">Celebrations</option>
                </select>
                <input type="text" placeholder="Image URL (e.g. /images/worship1.jpg)" value={galleryForm.image_url} onChange={(e) => setGalleryForm({ ...galleryForm, image_url: e.target.value })} required className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm" />
                <button type="submit" className="md:col-span-3 bg-churchNavy text-churchGold font-bold py-3 rounded-lg flex items-center justify-center gap-2"><Plus size={18} /> Upload Photo</button>
              </form>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-churchNavy mb-4">Existing Gallery Photos</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {gallery.map((gl) => (
                  <div key={gl.id} className="relative group bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <img src={gl.image_url} alt={gl.title} className="w-full h-32 object-cover" />
                    <div className="p-2">
                      <p className="text-xs font-bold text-churchNavy truncate">{gl.title || 'Untitled'}</p>
                      <span className="text-[10px] text-churchGold font-semibold">{gl.category}</span>
                    </div>
                    <button onClick={() => deleteItem('gallery_images', gl.id)} className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Announcements */}
        {activeTab === 'announcements' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-churchNavy mb-4 flex items-center gap-2"><Megaphone size={20} /> Post Top Banner Announcement</h3>
              <form onSubmit={addAnnouncement} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="e.g., Special Prayer Meeting this Friday at 7:00 PM!"
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  required
                  className="flex-grow px-4 py-2.5 rounded-lg border border-gray-300 text-sm"
                />
                <button type="submit" className="bg-churchNavy text-churchGold font-bold px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 shrink-0">
                  <Plus size={18} /> Publish Banner
                </button>
              </form>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-churchNavy mb-4">Active Announcements</h3>
              <div className="space-y-3">
                {announcements.map((an) => (
                  <div key={an.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-sm font-medium text-churchNavy">{an.message}</p>
                    <button onClick={() => deleteItem('announcements', an.id)} className="text-red-600 hover:text-red-800 p-2"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Prayer Wall Moderation */}
        {activeTab === 'prayers' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-churchNavy mb-4 flex items-center gap-2"><HeartHandshake size={20} /> Moderate Prayer Requests</h3>
            <div className="space-y-4">
              {prayers.map((pr) => (
                <div key={pr.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-churchNavy text-sm">{pr.author_name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${pr.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {pr.is_approved ? 'Approved & Public' : 'Pending Review'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{pr.request_text}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {!pr.is_approved && (
                      <button onClick={() => approvePrayer(pr.id)} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-green-700">
                        <Check size={14} /> Approve
                      </button>
                    )}
                    <button onClick={() => deleteItem('prayer_requests', pr.id)} className="text-red-600 hover:text-red-800 p-2"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}