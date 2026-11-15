import React, { useState } from 'react'
import { CheckCircle2, Clock3, MapPin, PhoneCall, Send, Music2 } from 'lucide-react'
import { churchDetails } from '../data/churchContent'

export default function Contact() {
  const [formData, setFormData] = useState({ sender_name: '', contact_info: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    setFormData({ sender_name: '', contact_info: '', message: '' })
  }

  return (
    <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-churchGold">Get in touch</p>
          <h1 className="mt-3 text-4xl font-extrabold text-churchNavy sm:text-5xl">Contact us &amp; directions</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            We would love to hear from you. Reach out with questions, prayer requests, or plan a visit this Sunday.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-churchNavy p-3 text-churchGold"><MapPin size={22} /></div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Address</p>
                  <p className="mt-2 text-lg font-bold text-churchNavy">{churchDetails.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-churchNavy p-3 text-churchGold"><Clock3 size={22} /></div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Worship Schedule</p>
                  <p className="mt-2 text-lg font-bold text-churchNavy">Every Sunday</p>
                  <p className="text-slate-600">11:00 AM – 1:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-churchNavy p-3 text-churchGold"><PhoneCall size={22} /></div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Leadership Contacts</p>
                  {churchDetails.contacts.map((person) => (
                    <a key={person.phone} href={person.tel} className="mt-2 block text-base font-medium text-slate-700 hover:text-churchNavy">
                      {person.name} • {person.phone}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-churchNavy p-3 text-churchGold"><Music2 size={22} /></div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">TikTok</p>
                  <a href={churchDetails.tiktokUrl} target="_blank" rel="noreferrer" className="mt-2 block text-base font-medium text-slate-700 hover:text-churchNavy">
                    @athens.nepali.chu
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-[0.12em] text-slate-600">Your Name</label>
                  <input type="text" required value={formData.sender_name} onChange={(event) => setFormData((current) => ({ ...current, sender_name: event.target.value }))} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none ring-0 transition focus:border-churchNavy" placeholder="Full name" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-[0.12em] text-slate-600">Phone or Email</label>
                  <input type="text" required value={formData.contact_info} onChange={(event) => setFormData((current) => ({ ...current, contact_info: event.target.value }))} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none ring-0 transition focus:border-churchNavy" placeholder="+30 694... or email@example.com" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-[0.12em] text-slate-600">Message</label>
                  <textarea rows={5} required value={formData.message} onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-churchNavy" placeholder="How can we help or pray for you?" />
                </div>

                <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-churchNavy px-5 py-3.5 text-base font-bold text-churchGold transition hover:bg-slate-900">
                  <Send size={18} /> Send Message
                </button>
              </form>
            ) : (
              <div className="flex min-h-[380px] flex-col items-center justify-center rounded-[1.5rem] bg-emerald-50 p-8 text-center">
                <CheckCircle2 className="text-emerald-600" size={56} />
                <h3 className="mt-4 text-2xl font-bold text-churchNavy">Thank You!</h3>
                <p className="mt-3 max-w-sm text-base text-slate-600">Your message has been received. Our church leadership will contact you soon.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 overflow-hidden rounded-[2rem] border border-slate-200 shadow-lg">
          <iframe title="Athens Nepali Church Map" src="https://www.google.com/maps?q=Patision+11,+Athens,+Greece&output=embed" width="100%" height="420" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </div>
  )
}
