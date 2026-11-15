import React from 'react'
import { BookOpen, Clock3, Coffee, Music4, MapPin } from 'lucide-react'

const experience = [
  { icon: Music4, title: 'Praise & Worship', text: 'Heartfelt worship through prayer, songs, and a joyful atmosphere of praise to God.' },
  { icon: BookOpen, title: 'The Word of God', text: 'Biblical teaching centered on truth, guidance, and practical spiritual growth for everyday life.' },
  { icon: Coffee, title: 'Fellowship & Tea', text: 'Warm fellowship after the service, where believers connect, share life, and pray together.' },
]

export default function Worship() {
  return (
    <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-churchGold">Join us this Sunday</p>
          <h1 className="mt-3 text-4xl font-extrabold text-churchNavy sm:text-5xl">Worship Service</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Every Sunday, we gather to worship Jesus Christ, hear His Word, and enjoy the warmth of Christian fellowship.
          </p>
        </div>

        <div className="mt-16 overflow-hidden rounded-[2rem] bg-churchNavy text-white shadow-xl">
          <div className="grid gap-8 p-8 sm:p-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-churchGold">Weekly Gathering</p>
              <h2 className="mt-3 text-3xl font-extrabold text-white">Sunday Worship Service</h2>
              <p className="mt-4 max-w-lg text-slate-200">
                We gather every week with joyful praise, heartfelt prayer, biblical teaching, and a spirit of unity and care.
              </p>
            </div>

            <div className="space-y-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-churchGold p-2 text-churchNavy"><Clock3 size={20} /></div>
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-300">Time</p>
                  <p className="mt-1 font-bold">11:00 AM – 1:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-churchGold p-2 text-churchNavy"><MapPin size={20} /></div>
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-300">Location</p>
                  <p className="mt-1 font-bold">Patision 11, Athens, Greece</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-18">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-churchGold">What to expect</p>
            <h2 className="mt-3 text-3xl font-extrabold text-churchNavy">A warm, biblical, and encouraging worship experience</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {experience.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 shadow-sm">
                <div className="mb-5 inline-flex rounded-2xl bg-churchNavy p-3 text-churchGold"><Icon size={24} /></div>
                <h3 className="mb-3 text-xl font-bold text-churchNavy">{title}</h3>
                <p className="text-base leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <h3 className="text-2xl font-bold text-churchNavy">Welcome to all visitors</h3>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Whether you are visiting Athens, new to the city, or seeking a church family, you are warmly welcome at Athens Nepali Church. We would love to meet you, pray with you, and help you find a place of belonging in Christ.
          </p>
        </div>
      </div>
    </div>
  )
}
