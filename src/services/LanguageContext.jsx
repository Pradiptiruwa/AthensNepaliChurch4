import React, { createContext, useContext, useState } from 'react'

const translations = {
  en: {
    navHome: 'Home',
    navAbout: 'About',
    navHistory: 'Our History',
    navWorship: 'Worship Service',
    navEvents: 'Events',
    navGallery: 'Gallery',
    navSermons: 'Sermons',
    navContact: 'Contact',
    adminLogin: 'Admin Login',
    heroBadge: 'Welcome to Athens Nepali Church • एथेन्स नेपाली मण्डली',
    heroTitle: 'Growing Together in Faith, Worship, and God\'s Word',
    heroDesc: 'A welcoming Nepali Christian family in the heart of Athens, Greece. Join us every Sunday as we lift up the name of Jesus together.',
    planVisit: 'Plan Your Visit',
    ourStory: 'Our Story',
    sundayWorship: 'Sunday Worship',
    location: 'Location',
    upcomingEvents: 'Upcoming Events',
  },
  ne: {
    navHome: 'गृह पृष्ठ',
    navAbout: 'हाम्रो बारेमा',
    navHistory: 'इतिहास',
    navWorship: 'आराधन सेवा',
    navEvents: 'कार्यक्रमहरू',
    navGallery: 'फोटो ग्यालरी',
    navSermons: 'वचनहरू',
    navContact: 'सम्पर्क',
    adminLogin: 'व्यवस्थापक लगइन',
    heroBadge: 'एथेन्स नेपाली मण्डलीमा स्वागत छ',
    heroTitle: 'विश्वास, आराधना र परमेश्वरको बचनमा सँगै बढ्दै',
    heroDesc: 'ग्रीसको एथेन्सको मुटुमा रहेको एक स्वागतयोग्य नेपाली ख्रीष्टियन परिवार। प्रत्येक आइतबार हामीसँगै येसुको नाम उँचो पार्न आउनुहोस्।',
    planVisit: 'तपाईंको भ्रमणको योजना बनाउनुहोस्',
    ourStory: 'हाम्रो कथा',
    sundayWorship: 'आइतबारको आराधना',
    location: 'ठेगाना',
    upcomingEvents: 'आगामी कार्यक्रमहरू',
  },
  el: {
    navHome: 'Αρχική',
    navAbout: 'Σχετικά',
    navHistory: 'Ιστορία',
    navWorship: 'Λατρεία',
    navEvents: 'Εκδηλώσεις',
    navGallery: 'Φωτογραφίες',
    navSermons: 'Κηρύγματα',
    navContact: 'Επικοινωνία',
    adminLogin: 'Είσοδος Διαχειριστή',
    heroBadge: 'Καλώς ήρθατε στην Εκκλησία Νεπαλέζων Αθηνών',
    heroTitle: 'Αυξανόμαστε Μαζί στην Πίστη, τη Λατρεία και τον Λόγο του Θεού',
    heroDesc: 'Μια φιλόξενη Νεπαλέζικη χριστιανική οικογένεια στην καρδιά της Αθήνας. Ελάτε μαζί μας κάθε Κυριακή.',
    planVisit: 'Προγραμματίστε την Επίσκεψή σας',
    ourStory: 'Η Ιστορία μας',
    sundayWorship: 'Κυριακάτικη Λατρεία',
    location: 'Τοποθεσία',
    upcomingEvents: 'Επερχόμενες Εκδηλώσεις',
  }
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')

  const t = (key) => {
    return translations[lang][key] || translations['en'][key] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}