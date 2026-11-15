import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { Image as ImageIcon, Sparkles } from 'lucide-react'

export default function Gallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    fetchGalleryImages()
  }, [])

  async function fetchGalleryImages() {
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false })

    setImages(data || [])
    setLoading(false)
  }

  const categories = ['All', 'Worship', 'Prayer', 'Fellowship', 'Celebrations']

  const filteredImages = activeFilter === 'All' 
    ? images 
    : images.filter(img => img.category === activeFilter)

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 text-churchGold font-semibold text-sm uppercase tracking-wider bg-churchNavy/5 px-4 py-1.5 rounded-full">
            <Sparkles size={16} /> Photo & Media Gallery
          </span>
          <h1 className="text-4xl font-extrabold text-churchNavy mt-3 mb-4">Athens Nepali Church Moments</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore glimpses of our Sunday worship services, community fellowships, and joyous gatherings in Greece.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  activeFilter === cat
                    ? 'bg-churchNavy text-churchGold shadow-md scale-105'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <p className="text-center text-gray-500 py-20">Loading gallery photos...</p>
        ) : filteredImages.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-2xl border border-gray-200 max-w-md mx-auto">
            <ImageIcon className="mx-auto text-churchGold mb-3" size={48} />
            <h3 className="text-lg font-bold text-churchNavy">No photos found</h3>
            <p className="text-sm text-gray-500 mt-1">Upload photos via your Admin Dashboard under the Gallery tab.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((img) => (
              <div 
                key={img.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 transform hover:-translate-y-1"
              >
                <div className="relative overflow-hidden h-64 bg-gray-200">
                  <img 
                    src={img.image_url} 
                    alt={img.title || 'Church Photo'} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1543165365-0723ac8638c8?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="bg-churchGold text-churchNavy text-xs font-bold px-3 py-1 rounded-full">
                      {img.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-churchNavy text-base">{img.title || 'Sunday Fellowship'}</h3>
                  <p className="text-xs text-gray-400 mt-1">{new Date(img.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}