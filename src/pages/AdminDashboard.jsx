import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { 
  Lock, LogOut, Plus, Trash2, Calendar, BookOpen, Image as ImageIcon, 
  Megaphone, HeartHandshake, Check, Users, Mail 
} from 'lucide-react'

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [activeTab, setActiveTab] = useState('events')

  // Database Records
  const [events, setEvents] = useState([])
  const [sermons, setSermons] = useState([])
  const [gallery, setGallery] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [prayers, setPrayers] = useState([])
  const [visits, setVisits] = useState([])
  const [messages, setMessages] = useState([])

  // Forms State
  const [eventForm, setEventForm] = useState({ title: '', description: '', event_date: '', location: '', image_url: '' })
  const [sermonForm, setSermonForm] = useState({ title: '', speaker: '', sermon_date: '', description: '', media_url: '' })
  const [galleryForm, setGalleryForm] = useState({ title: '', category: 'Worship', image_url: '' })
  const [announcementText, setAnnouncementText] = useState('')
  const [uploading, setUploading] = useState(false)

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
    const [evRes, smRes, glRes, anRes, prRes, vsRes, msRes] = await Promise.all([
      supabase.from('events').select('*').order('event_date', { ascending: true }),
      supabase.from('sermons').select('*').order('sermon_date', { ascending: false }),
      supabase.from('gallery_images').select('*').order('created_at', { ascending: false }),
      supabase.from('announcements').select('*').order('created_at', { ascending: false }),
      supabase.from('prayer_requests').select('*').order('created_at', { ascending: false }),
      supabase.from('visit_requests').select('*').order('created_at', { ascending: false }),
      supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
    ])

    setEvents(evRes.data || [])
    setSermons(smRes.data || [])
    setGallery(glRes.data || [])
    setAnnouncements(anRes.data || [])
    setPrayers(prRes.data || [])
    setVisits(vsRes.data || [])
    setMessages(msRes.data || [])
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

  async function addGalleryFile(e) {
    e.preventDefault()
    const fileInput = document.getElementById('churchPhotoInput')
    const file = fileInput?.files[0]

    if (!file) {
      alert('Please select a photo from your device.')
      return
    }

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('church-gallery')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('church-gallery')
        .getPublicUrl(filePath)

      await supabase.from('gallery_images').insert([{
        title: galleryForm.title,
        category: galleryForm.category,
        image_url: publicUrl
      }])

      setGalleryForm({ title: '', category: 'Worship', image_url: '' })
      fileInput.value = ''
      fetchAllData()
      alert('Your church photo uploaded successfully!')
    } catch (error) {
      alert('Error uploading photo: ' + error.message)
    } finally {
      setUploading(false)
    }
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
    return <div className="text-center py-20 text-gray-500">Loading Admin Portal...</div>
  }

  if (!user) {
    return (
      <div className="bg-gray-50 min-h-[80vh] flex items-center justify-center py-12 px-4 animate-fadeIn">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md border border-gray-200">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-churchNavy text-churchGold rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Lock size={24} />
            </div>
            <h2 className="text-2xl font-bold text-churchNavy">Admin Portal</h2>
            <p className="text-sm text-gray-500 mt-1">Sign in to manage Athens Nepali Church</p>
          </div>

          {loginError && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mb-4 border border-red-100">
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
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-churchNavy text-sm"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-churchNavy text-sm"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-churchNavy text-churchGold font-bold py-3.5 rounded-xl hover:bg-opacity-95 transition-colors shadow-md cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    )
  }

  const pendingPrayersCount = prayers.filter(p => !p.is_approved).length

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-churchNavy">Church Admin Dashboard</h1>
            <p className="text-xs text-gray-500 mt-0.5">Signed in as <span className="font-semibold">{user.email}</span></p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors cursor-pointer"
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>

        {/* Overview Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs uppercase font-bold text-gray-400">Upcoming Events</p>
            <p className="text-2xl font-extrabold text-churchNavy mt-1">{events.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs uppercase font-bold text-gray-400">Pending Prayers</p>
            <p className="text-2xl font-extrabold text-churchGold mt-1">{pendingPrayersCount}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs uppercase font-bold text-gray-400">Guest Visit RSVPs</p>
            <p className="text-2xl font-extrabold text-churchNavy mt-1">{visits.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs uppercase font-bold text-gray-400">Inbox Messages</p>
            <p className="text-2xl font-extrabold text-churchNavy mt-1">{messages.length}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-3">
          {[
            { id: 'events', label: 'Events' },
            { id: 'sermons', label: 'Sermons' },
            { id: 'gallery', label: 'Gallery Photos' },
            { id: 'announcements', label: 'Announcements' },
            { id: 'prayers', label: `Prayer Wall (${pendingPrayersCount} Pending)` },
            { id: 'visits', label: `Guest Visits (${visits.length})` },
            { id: 'messages', label: `Messages (${messages.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-churchNavy text-churchGold shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: EVENTS */}
        {activeTab === 'events' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-churchNavy mb-4 flex items-center gap-2"><Calendar size={20} className="text-churchGold" /> Add New Event</h3>
              <form onSubmit={addEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Event Title" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} required className="px-4 py-2.5 rounded-xl border border-gray-300 text-sm" />
                <input type="datetime-local" value={eventForm.event_date} onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })} required className="px-4 py-2.5 rounded-xl border border-gray-300 text-sm" />
                <input type="text" placeholder="Location (e.g. Patision 11)" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} className="px-4 py-2.5 rounded-xl border border-gray-300 text-sm" />
                <input type="text" placeholder="Image URL (optional)" value={eventForm.image_url} onChange={(e) => setEventForm({ ...eventForm, image_url: e.target.value })} className="px-4 py-2.5 rounded-xl border border-gray-300 text-sm" />
                <textarea placeholder="Event Description" value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} rows={2} className="md:col-span-2 px-4 py-2.5 rounded-xl border border-gray-300 text-sm"></textarea>
                <button type="submit" className="md:col-span-2 bg-churchNavy text-churchGold font-bold py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer"><Plus size={18} /> Add Event</button>
              </form>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-churchNavy mb-4">Existing Events</h3>
              <div className="space-y-3">
                {events.map((ev) => (
                  <div key={ev.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <p className="font-bold text-churchNavy">{ev.title}</p>
                      <p className="text-xs text-gray-500">{new Date(ev.event_date).toLocaleString()} • {ev.location}</p>
                    </div>
                    <button onClick={() => deleteItem('events', ev.id)} className="text-red-600 hover:text-red-800 p-2 cursor-pointer"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SERMONS */}
        {activeTab === 'sermons' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-churchNavy mb-4 flex items-center gap-2"><BookOpen size={20} className="text-churchGold" /> Add New Sermon</h3>
              <form onSubmit={addSermon} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Sermon Title" value={sermonForm.title} onChange={(e) => setSermonForm({ ...sermonForm, title: e.target.value })} required className="px-4 py-2.5 rounded-xl border border-gray-300 text-sm" />
                <input type="text" placeholder="Speaker Name" value={sermonForm.speaker} onChange={(e) => setSermonForm({ ...sermonForm, speaker: e.target.value })} required className="px-4 py-2.5 rounded-xl border border-gray-300 text-sm" />
                <input type="date" value={sermonForm.sermon_date} onChange={(e) => setSermonForm({ ...sermonForm, sermon_date: e.target.value })} required className="px-4 py-2.5 rounded-xl border border-gray-300 text-sm" />
                <input type="text" placeholder="YouTube Video Link (e.g. https://youtu.be/...)" value={sermonForm.media_url} onChange={(e) => setSermonForm({ ...sermonForm, media_url: e.target.value })} className="px-4 py-2.5 rounded-xl border border-gray-300 text-sm" />
                <textarea placeholder="Sermon Summary / Description" value={sermonForm.description} onChange={(e) => setSermonForm({ ...sermonForm, description: e.target.value })} rows={2} className="md:col-span-2 px-4 py-2.5 rounded-xl border border-gray-300 text-sm"></textarea>
                <button type="submit" className="md:col-span-2 bg-churchNavy text-churchGold font-bold py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer"><Plus size={18} /> Add Sermon</button>
              </form>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-churchNavy mb-4">Existing Sermons</h3>
              <div className="space-y-3">
                {sermons.map((sm) => (
                  <div key={sm.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <p className="font-bold text-churchNavy">{sm.title} <span className="text-xs font-normal text-gray-500">({sm.speaker})</span></p>
                      <p className="text-xs text-gray-500">{sm.sermon_date}</p>
                    </div>
                    <button onClick={() => deleteItem('sermons', sm.id)} className="text-red-600 hover:text-red-800 p-2 cursor-pointer"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-churchNavy mb-4 flex items-center gap-2"><ImageIcon size={20} className="text-churchGold" /> Upload Church Photo from Device</h3>
              <form onSubmit={addGalleryFile} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input 
                  type="text" 
                  placeholder="Photo Title (e.g. Sunday Service)" 
                  value={galleryForm.title} 
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })} 
                  required 
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-sm" 
                />
                <select 
                  value={galleryForm.category} 
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })} 
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-sm"
                >
                  <option value="Worship">Worship</option>
                  <option value="Prayer">Prayer</option>
                  <option value="Fellowship">Fellowship</option>
                  <option value="Celebrations">Celebrations</option>
                </select>
                <input 
                  id="churchPhotoInput"
                  type="file" 
                  accept="image/*"
                  required 
                  className="px-3 py-2 rounded-xl border border-gray-300 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-churchNavy file:text-churchGold hover:file:bg-opacity-90" 
                />
                <button 
                  type="submit" 
                  disabled={uploading}
                  className="md:col-span-3 bg-churchNavy text-churchGold font-bold py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md hover:bg-opacity-95"
                >
                  <Plus size={18} /> {uploading ? 'Uploading to Server...' : 'Upload & Publish Photo'}
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-churchNavy mb-4">Published Gallery Photos ({gallery.length})</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {gallery.map((gl) => (
                  <div key={gl.id} className="relative group bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <img src={gl.image_url} alt={gl.title} className="w-full h-36 object-cover" />
                    <div className="p-2.5 bg-white">
                      <p className="text-xs font-bold text-churchNavy truncate">{gl.title || 'Untitled'}</p>
                      <span className="text-[10px] text-churchGold font-bold uppercase">{gl.category}</span>
                    </div>
                    <button onClick={() => deleteItem('gallery_images', gl.id)} className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ANNOUNCEMENTS */}
        {activeTab === 'announcements' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-churchNavy mb-4 flex items-center gap-2"><Megaphone size={20} className="text-churchGold" /> Post Top Banner Announcement</h3>
              <form onSubmit={addAnnouncement} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="e.g., Special Fasting & Prayer this Friday at 7:00 PM!"
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  required
                  className="flex-grow px-4 py-2.5 rounded-xl border border-gray-300 text-sm"
                />
                <button type="submit" className="bg-churchNavy text-churchGold font-bold px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 shrink-0 cursor-pointer">
                  <Plus size={18} /> Publish Banner
                </button>
              </form>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-churchNavy mb-4">Active Announcements</h3>
              <div className="space-y-3">
                {announcements.map((an) => (
                  <div key={an.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-sm font-medium text-churchNavy">{an.message}</p>
                    <button onClick={() => deleteItem('announcements', an.id)} className="text-red-600 hover:text-red-800 p-2 cursor-pointer"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PRAYER WALL MODERATION */}
        {activeTab === 'prayers' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-churchNavy mb-4 flex items-center gap-2"><HeartHandshake size={20} className="text-churchGold" /> Moderate Prayer Requests</h3>
            <div className="space-y-4">
              {prayers.map((pr) => (
                <div key={pr.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
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
                      <button onClick={() => approvePrayer(pr.id)} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-green-700 cursor-pointer">
                        <Check size={14} /> Approve
                      </button>
                    )}
                    <button onClick={() => deleteItem('prayer_requests', pr.id)} className="text-red-600 hover:text-red-800 p-2 cursor-pointer"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: GUEST VISIT REQUESTS */}
        {activeTab === 'visits' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-churchNavy mb-4 flex items-center gap-2"><Users size={20} className="text-churchGold" /> First-Time Guest Visit Requests</h3>
            {visits.length === 0 ? (
              <p className="text-sm text-gray-500">No guest visit RSVPs yet.</p>
            ) : (
              <div className="space-y-4">
                {visits.map((vs) => (
                  <div key={vs.id} className="flex justify-between items-start p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <p className="font-bold text-churchNavy">{vs.full_name} <span className="text-xs font-normal text-churchGold bg-churchNavy px-2 py-0.5 rounded-full ml-2">{vs.visit_date}</span></p>
                      <p className="text-xs font-semibold text-gray-600 mt-1">Contact: {vs.phone_or_email}</p>
                      {vs.notes && <p className="text-xs text-gray-500 mt-1">Note: {vs.notes}</p>}
                      <p className="text-[10px] text-gray-400 mt-1">{new Date(vs.created_at).toLocaleString()}</p>
                    </div>
                    <button onClick={() => deleteItem('visit_requests', vs.id)} className="text-red-600 hover:text-red-800 p-2 cursor-pointer"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 7: CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-churchNavy mb-4 flex items-center gap-2"><Mail size={20} className="text-churchGold" /> Contact Form Inbox</h3>
            {messages.length === 0 ? (
              <p className="text-sm text-gray-500">No contact messages yet.</p>
            ) : (
              <div className="space-y-4">
                {messages.map((ms) => (
                  <div key={ms.id} className="flex justify-between items-start p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <p className="font-bold text-churchNavy">{ms.sender_name}</p>
                      <p className="text-xs font-semibold text-gray-600">Contact: {ms.contact_info}</p>
                      <p className="text-sm text-gray-700 mt-2 bg-white p-3 rounded-lg border border-gray-200">{ms.message}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{new Date(ms.created_at).toLocaleString()}</p>
                    </div>
                    <button onClick={() => deleteItem('contact_messages', ms.id)} className="text-red-600 hover:text-red-800 p-2 cursor-pointer"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}