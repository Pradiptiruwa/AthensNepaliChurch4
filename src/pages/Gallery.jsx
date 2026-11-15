import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { Image as ImageIcon, Sparkles, Calendar } from 'lucide-react'

export default function Gallery() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Worship', 'Prayer', 'Fellowship', 'Celebrations']

  useEffect(() => {
    fetchGalleryPhotos()
  }, [])

  async function fetchGalleryPhotos() {
    // Fetching from 'gallery_images' to match AdminDashboard
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching gallery photos:', error)
    } else {
      setPhotos(data || [])
    }
    setLoading(false)
  }

  // Filter photos based on category
  const filteredPhotos = selectedCategory === 'All' 
    ? photos 
    : photos.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase())

  return (
    <div className="bg-white text-gray-800 animate-fadeIn pb-20">
      
      {/* Header / Hero Section with Background Video */}
      <section className="relative bg-churchNavy text-white py-28 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/worshipvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-churchNavy opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-churchGold/20 border border-churchGold/30 text-churchGold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles size={14}/> Photo Gallery
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-md">
            Moments of Fellowship
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto font-light drop-shadow">
            Glimpses of our Sunday worship services, prayer meetings, and joyous community celebrations in Athens.
          </p>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-churchNavy text-churchGold shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading gallery photos...</div>
        ) : filteredPhotos.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100 max-w-xl mx-auto p-8">
            <ImageIcon className="mx-auto text-gray-400 mb-3" size={48} />
            <h3 className="text-xl font-bold text-churchNavy mb-1">No Photos Found</h3>
            <p className="text-sm text-gray-500">No photos are available in this category yet. Check back soon or add from the Admin Dashboard.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPhotos.map((photo) => (
              <div 
                key={photo.id} 
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img 
                    src={photo.image_url} 
                    alt={photo.title || 'Church Fellowship'} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 right-3 bg-churchNavy/80 backdrop-blur-md text-churchGold text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {photo.category || 'Fellowship'}
                  </span>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-churchNavy mb-1 group-hover:text-churchGold transition-colors">
                    {photo.title}
                  </h3>
                  {photo.description && (
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{photo.description}</p>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-auto pt-4 border-t border-gray-100">
                    <Calendar size={13} /> {new Date(photo.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  )
}