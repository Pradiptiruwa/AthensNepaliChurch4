import React from 'react'
import { Clock, MapPin, Music, BookOpen, Coffee } from 'lucide-react'
import { useLanguage } from '../services/LanguageContext'

export default function Worship() {
  const { t } = useLanguage()

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-churchGold font-semibold text-sm uppercase tracking-wider">{t('worshipSubtitle')}</span>
          <h1 className="text-4xl font-extrabold text-churchNavy mt-2 mb-4">{t('worshipTitle')}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('worshipDesc')}
          </p>
        </div>

        {/* Time & Location Card */}
        <div className="bg-churchNavy text-white rounded-2xl p-8 md:p-12 mb-16 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="bg-churchGold/20 text-churchGold px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">{t('weeklyGathering')}</span>
            <h2 className="text-3xl font-bold mt-3 mb-2">{t('weeklyTitle')}</h2>
            <p className="text-gray-300 text-sm max-w-md">
              {t('weeklyDesc')}
            </p>
          </div>
          <div className="space-y-4 shrink-0 w-full md:w-auto">
            <div className="flex items-center space-x-3 bg-white/10 px-5 py-3 rounded-xl">
              <Clock className="text-churchGold" size={22} />
              <div>
                <p className="text-xs text-gray-300">{t('timeLabel')}</p>
                <p className="font-bold">11:00 AM – 1:00 PM</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 px-5 py-3 rounded-xl">
              <MapPin className="text-churchGold" size={22} />
              <div>
                <p className="text-xs text-gray-300">{t('location')}</p>
                <p className="font-bold">Patision 11, Athens, Greece</p>
              </div>
            </div>
          </div>
        </div>

        {/* What to Expect */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-churchNavy">{t('expectTitle')}</h2>
          <p className="text-gray-600 mt-2">{t('expectDesc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
            <div className="w-12 h-12 bg-churchNavy text-churchGold rounded-lg flex items-center justify-center mb-4">
              <Music size={22} />
            </div>
            <h3 className="text-lg font-bold text-churchNavy mb-2">{t('praiseTitle')}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t('praiseDesc')}
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
            <div className="w-12 h-12 bg-churchNavy text-churchGold rounded-lg flex items-center justify-center md:h-12">
              <BookOpen size={22} />
            </div>
            <h3 className="text-lg font-bold text-churchNavy mb-2">{t('wordTitle')}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t('wordDesc')}
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
            <div className="w-12 h-12 bg-churchNavy text-churchGold rounded-lg flex items-center justify-center mb-4">
              <Coffee size={22} />
            </div>
            <h3 className="text-lg font-bold text-churchNavy mb-2">{t('fellowshipTitle')}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t('fellowshipDesc')}
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}