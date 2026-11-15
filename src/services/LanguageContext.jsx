import React, { createContext, useContext } from 'react'

const englishTranslations = {
  navHome: 'Home',
  navAbout: 'About',
  navHistory: 'Our History',
  navWorship: 'Worship Service',
  navEvents: 'Events',
  navGallery: 'Gallery',
  navSermons: 'Sermons',
  navPrayer: 'Prayer Wall',
  navContact: 'Contact',
  adminLogin: 'Admin Login',
  heroBadge: 'Welcome to Athens Nepali Church',
  heroTitle: 'Growing Together in Faith, Worship, and God\'s Word',
  heroDesc: 'A welcoming Nepali Christian family in the heart of Athens, Greece. Join us every Sunday as we lift up the name of Jesus together.',
  countdownTitle: 'Next Sunday Worship Service In',
  planVisit: 'Plan Your Visit',
  prayerWallBtn: 'Prayer Wall',
  sundayWorship: 'Sunday Worship',
  location: 'Location',
  upcomingEvents: 'Upcoming Events',
  viewCalendar: 'View Calendar',
  missionTitle: 'Our Heart & Mission',
  missionDesc: 'From a small living-room prayer gathering in November 2025 to a growing family of believers, we are committed to Christ-centered fellowship.',
  pillar1Title: 'Spirit-Filled Worship',
  pillar1Desc: 'We gather every Sunday to praise God in Nepali and English, experiencing His presence through heartfelt music and prayer.',
  pillar2Title: 'Biblical Teaching',
  pillar2Desc: 'Grounded in Scripture, our messages equip believers to live out their faith boldly in everyday life in Greece.',
  pillar3Title: 'Loving Community',
  pillar3Desc: 'Whether you are new to Athens or have lived here for years, you have a spiritual home and family waiting for you.',
  verseText: '"The Lord has done great things for us, and we are filled with joy."',
  verseRef: '— Psalm 126:3',
  worshipSubtitle: 'Join Us This Sunday',
  worshipTitle: 'Worship Service',
  worshipDesc: 'Experience uplifting Nepali and English worship, encouraging biblical messages, and warm Christian fellowship.',
  weeklyGathering: 'Weekly Gathering',
  weeklyTitle: 'Sunday Worship Service',
  weeklyDesc: 'We gather every week to lift our voices in praise, study God\'s Word together, and pray for one another.',
  timeLabel: 'Time',
  expectTitle: 'What to Expect',
  expectDesc: 'Here is a quick overview of our Sunday service format.',
  praiseTitle: 'Praise & Worship',
  praiseDesc: 'Heartfelt worship through traditional and contemporary Nepali Christian songs, lifting our hearts to God.',
  wordTitle: 'Word of God',
  wordDesc: 'Expository and practical preaching straight from the Holy Bible to guide our daily walk of faith.',
  fellowshipTitle: 'Fellowship & Tea',
  fellowshipDesc: 'Connecting with one another after the service over tea, sharing life stories, and praying together.',
  contactSubtitle: 'Get in Touch',
  contactTitle: 'Contact Us & Directions',
  contactDesc: 'We would love to hear from you. Reach out with questions or visit us this Sunday in the heart of Athens.',
  churchInfo: 'Church Information',
  leadershipContacts: 'Leadership Contacts',
  sendMessage: 'Send Us a Message',
  yourName: 'Your Name',
  phoneOrEmail: 'Phone or Email',
  messageLabel: 'Message',
  sendBtn: 'Send Message',
  thankYouTitle: 'Thank You!',
  thankYouDesc: 'Your message has been received. Our leadership team will contact you soon.',
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const t = (key) => englishTranslations[key] || key
  return (
    <LanguageContext.Provider value={{ t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}