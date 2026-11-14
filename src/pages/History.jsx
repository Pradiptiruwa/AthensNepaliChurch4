import React from 'react'
import { Calendar, Users, Home, Sparkles } from 'lucide-react'

export default function History() {
  const milestones = [
    {
      date: 'November 7, 2025',
      title: 'Humble Beginnings',
      description: 'Athens Nepali Church began with a small gathering of just 5–6 believers meeting for prayer and fellowship in the home of Elder Sagar Sunar.',
      icon: Home,
    },
    {
      date: 'Early 2026',
      title: 'Growing in Faith & Numbers',
      description: 'As word spread among the Nepali community in Athens, more families and individuals joined weekly worship, outgrowing a single living room.',
      icon: Users,
    },
    {
      date: '2026 – Present',
      title: 'A Thriving Congregation at Patision 11',
      description: 'Today, God has blessed the church with 50–60 faithful believers gathering every Sunday at Patision 11, celebrating God’s faithfulness (Psalm 126:3).',
      icon: Sparkles,
    },
  ]

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="text-churchGold font-semibold text-sm uppercase tracking-wider">Our Journey of Faith</span>
          <h1 className="text-4xl font-extrabold text-churchNavy mt-2 mb-4">Our Church History</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Witnessing God's grace transform a small home prayer group into a vibrant spiritual family in Athens.
          </p>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gray-200">
          {milestones.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-churchNavy text-churchGold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <IconComponent size={18} />
                </div>

                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex items-center space-x-2 text-churchGold font-semibold text-sm mb-1">
                    <Calendar size={14} />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-churchNavy mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}