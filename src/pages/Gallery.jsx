import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { Image as ImageIcon } from 'lucide-react'

export default function Gallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Worship', 'Prayer', 'Fellowship', 'Celebrations']

  useEffect(() => {
    fetchGallery()
  }, [])

  async function fetchGallery() {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setImages(data || [])
    } catch (err) {
      console.error('Error fetching gallery:', err.message)
    } finally {
      setLoading(false)
    }
  }

  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(img => img.category === selectedCategory)

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <span className="text-churchGold font-semibold text-sm uppercase tracking-wider">Moments of Grace</span>
          <h1 className="text-4xl font-extrabold text-churchNavy mt-2 mb-4">Photo Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A glimpse into our worship services, prayer meetings, and community life in Athens.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-churchNavy text-churchGold'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-12">Loading gallery photos...</p>
        ) : filteredImages.length === 0 ? (
          <div className="text-center bg-gray-50 rounded-2xl p-12 border border-gray-100">
            <ImageIcon className="mx-auto text-churchGold mb-4" size={48} />
            <h3 className="text-xl font-bold text-churchNavy mb-2">No Photos Found</h3>
            <p className="text-gray-600 text-sm">
              Upload photos via the admin dashboard to populate the gallery!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((img) => (
              <div key={img.id} className="bg-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div className="aspect-square overflow-hidden bg-gray-200">
                  <img
                    src={img.image_url}
                    alt={img.title || 'Church Photo'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {img.title && (
                  <div className="p-4 bg-white">
                    <p className="font-semibold text-churchNavy text-sm">{img.title}</p>
                    <span className="text-xs text-churchGold font-medium">{img.category}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}