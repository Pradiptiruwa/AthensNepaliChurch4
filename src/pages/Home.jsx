import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, CalendarDays, Clock3, MapPin, Music4, PhoneCall, Users, Sparkles, MessageCircleHeart } from 'lucide-react'
import { churchDetails, upcomingEvents, galleryImages } from '../data/churchContent'

export default function Home() {
  const featuredPhotos = galleryImages.slice(0, 3)

  return (
    <div className="bg-white text-gray-800">
      <section className="relative overflow-hidden bg-churchNavy text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-churchNavy/80" />

        <div className="page-shell relative px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="text-center lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-churchGold/40 bg-churchGold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-churchGold">
                  <Sparkles size={14} /> Welcome to Athens Nepali Church
                </span>
                <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                  Growing Together in Faith, Worship, and God&apos;s Word
                </h1>
                <p className="mt-6 max-w-xl text-lg text-slate-200">
                  A welcoming Nepali Christian family in the heart of Athens, Greece. Join us every Sunday as we lift up the name of Jesus together.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                  <Link to="/worship" className="inline-flex items-center justify-center gap-2 rounded-xl bg-churchGold px-6 py-3.5 text-base font-bold text-churchNavy transition hover:bg-yellow-500">
                    Join Our Worship <ArrowRight size={18} />
                  </Link>
                  <Link to="/about" className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition hover:border-churchGold hover:text-churchGold">
                    Discover Our Church
                  </Link>
                </div>

                <div className="mt-10 grid max-w-lg gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <p className="text-2xl font-black text-white">50–60</p>
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-300">believers</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <p className="text-2xl font-black text-white">2025</p>
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-300">church started</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <p className="text-2xl font-black text-white">Sunday</p>
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-300">worship</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
                <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
                  <img src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80" alt="Church worship gathering" className="h-[420px] w-full object-cover" />
                </div>
                <div className="mt-4 rounded-2xl border border-churchGold/40 bg-churchGold/10 p-4 text-left">
                  <div className="flex items-center justify-between gap-6">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-churchGold">Worship Service</p>
                      <p className="mt-2 text-xl font-extrabold text-white">Every Sunday</p>
                    </div>
                    <div className="rounded-xl bg-churchGold px-3 py-2 text-center text-xs font-bold text-churchNavy">11:00 AM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="page-shell grid gap-6 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="rounded-xl bg-churchNavy p-3 text-churchGold"><Clock3 size={22} /></div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Sunday Worship</p>
              <p className="font-bold text-churchNavy">11:00 AM – 1:00 PM</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="rounded-xl bg-churchNavy p-3 text-churchGold"><MapPin size={22} /></div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Location</p>
              <p className="font-bold text-churchNavy">{churchDetails.address}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="rounded-xl bg-churchNavy p-3 text-churchGold"><CalendarDays size={22} /></div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Upcoming Events</p>
              <Link to="/events" className="font-bold text-churchNavy hover:text-churchGold underline">View calendar</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-churchGold">Our Heart & Mission</p>
          <h2 className="mt-3 text-3xl font-extrabold text-churchNavy sm:text-4xl">A church family rooted in grace, worship, and Christ-centered fellowship.</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            { icon: Music4, title: 'Spirit-Filled Worship', text: 'We gather to praise God, pray together, and worship in a warm and reverent atmosphere.' },
            { icon: BookOpen, title: 'Biblical Teaching', text: 'The Word of God is our foundation, helping us grow in truth, wisdom, and spiritual maturity.' },
            { icon: Users, title: 'Loving Community', text: 'Everyone is welcomed into a caring family where faith, prayer, and friendship thrive.' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-5 inline-flex rounded-2xl bg-churchNavy p-3 text-churchGold"><Icon size={24} /></div>
              <h3 className="mb-3 text-xl font-bold text-churchNavy">{title}</h3>
              <p className="text-base leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-churchNavy text-white">
        <div className="page-shell px-4 py-18 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <blockquote className="text-2xl font-serif italic text-churchGold sm:text-4xl">
              “The Lord has done great things for us, and we are filled with joy.”
            </blockquote>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-slate-300">— Psalm 126:3</p>
          </div>
        </div>
      </section>

      <section className="page-shell px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-churchGold">Upcoming Events</p>
            <h2 className="mt-3 text-3xl font-extrabold text-churchNavy">Gatherings for worship, prayer, and fellowship</h2>
          </div>
          <Link to="/events" className="hidden text-sm font-semibold text-churchNavy underline sm:inline-flex">See all events</Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <div key={event.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex rounded-full bg-churchNavy px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-churchGold">{event.date}</div>
              <h3 className="text-xl font-bold text-churchNavy">{event.title}</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex items-center gap-2"><Clock3 size={14} className="text-churchGold" /> {event.time}</div>
                <div className="flex items-center gap-2"><MapPin size={14} className="text-churchGold" /> {event.location}</div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{event.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="page-shell px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-churchGold">Gallery Moments</p>
              <h2 className="mt-3 text-3xl font-extrabold text-churchNavy">Life in our church family</h2>
            </div>
            <Link to="/gallery" className="hidden text-sm font-semibold text-churchNavy underline sm:inline-flex">Explore gallery</Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {featuredPhotos.map((photo) => (
              <div key={photo.id} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <img src={photo.imageUrl} alt={photo.title} className="h-80 w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] bg-slate-50 p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-churchGold">A Church With a History</p>
            <h2 className="mt-3 text-3xl font-extrabold text-churchNavy">From a small prayer gathering to a growing family in Christ</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">{churchDetails.historyEnglish}</p>
            <Link to="/history" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-churchNavy px-5 py-3 font-semibold text-white transition hover:bg-slate-900">
              Read Full History <ArrowRight size={18} />
            </Link>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-churchGold">Connect With Us</p>
            <h3 className="mt-3 text-3xl font-extrabold text-churchNavy">Let us know how we can pray and serve you.</h3>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-churchNavy p-2 text-churchGold"><MapPin size={18} /></div>
                <div>
                  <p className="font-bold text-churchNavy">Address</p>
                  <p className="text-slate-600">{churchDetails.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-churchNavy p-2 text-churchGold"><PhoneCall size={18} /></div>
                <div>
                  <p className="font-bold text-churchNavy">Leadership Contacts</p>
                  {churchDetails.contacts.map((person) => (
                    <a key={person.phone} href={person.tel} className="mt-1 block text-slate-600 hover:text-churchNavy">{person.name} • {person.phone}</a>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-churchNavy p-2 text-churchGold"><MessageCircleHeart size={18} /></div>
                <div>
                  <p className="font-bold text-churchNavy">TikTok</p>
                  <a href={churchDetails.tiktokUrl} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-churchNavy">@athens.nepali.chu</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
