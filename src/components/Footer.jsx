import React from 'react'
import { Clock3, MapPin, Music4, PhoneCall } from 'lucide-react'
import { churchDetails } from '../data/churchContent'

export default function Footer() {
  return (
    <footer className="bg-churchNavy text-slate-300">
      <div className="page-shell px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-churchGold p-1">
                <img src="/logo.png" alt="Athens Nepali Church logo" className="h-full w-full rounded-full bg-white object-cover" />
              </div>
              <p className="text-xl font-bold text-white">Athens Nepali Church</p>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              A joyful church family in Athens, growing together in faith, worship, and God&apos;s grace.
            </p>
            <p className="mt-4 text-sm italic text-churchGold">“The Lord has done great things for us, and we are filled with joy.” — Psalm 126:3</p>
          </div>

          <div>
            <h3 className="mb-4 text-base font-bold uppercase tracking-[0.18em] text-white">Worship &amp; Location</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3"><Clock3 size={18} className="mt-1 text-churchGold" /><span>Sunday Worship Service<br />11:00 AM – 1:00 PM</span></li>
              <li className="flex items-start gap-3"><MapPin size={18} className="mt-1 text-churchGold" /><span>{churchDetails.address}</span></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-bold uppercase tracking-[0.18em] text-white">Leadership &amp; Social</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              {churchDetails.contacts.map((person) => (
                <li key={person.phone} className="flex items-start gap-3">
                  <PhoneCall size={18} className="mt-1 text-churchGold" />
                  <div>
                    <p className="font-medium text-white">{person.name}</p>
                    <a href={person.tel} className="hover:text-churchGold">{person.phone}</a>
                  </div>
                </li>
              ))}
              <li className="flex items-start gap-3"><Music4 size={18} className="mt-1 text-churchGold" /><a href={churchDetails.tiktokUrl} target="_blank" rel="noreferrer" className="hover:text-churchGold">@athens.nepali.chu</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Athens Nepali Church. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
