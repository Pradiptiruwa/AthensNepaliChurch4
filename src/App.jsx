import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './services/LanguageContext'
import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import PlanVisit from './pages/PlanVisit'
import Home from './pages/Home'
import About from './pages/About'
import History from './pages/History'
import Worship from './pages/Worship'
import Events from './pages/Events'
import Gallery from './pages/Gallery'
import Sermons from './pages/Sermons'
import PrayerWall from './pages/PrayerWall'
import Contact from './pages/Contact'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <AnnouncementBar />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/history" element={<History />} />
              <Route path="/worship" element={<Worship />} />
              <Route path="/events" element={<Events />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/sermons" element={<Sermons />} />
              <Route path="/prayer-wall" element={<PrayerWall />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/plan-visit" element={<PlanVisit/>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  )
}