import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState, useCallback } from 'react'

export const Route = createFileRoute('/')({
  component: WeddingInvitation,
})

const WEDDING_DATE = new Date('2026-05-09T10:35:00+05:30')

const EVENTS = [
  {
    id: 'haldi',
    name: 'Haldi',
    icon: '🌼',
    date: '08 May 2026',
    time: '10:00 AM',
    venue: 'Karimnagar',
    address: 'Home Venue, Karimnagar',
    mapUrl: 'https://maps.app.goo.gl/BjuETXipYEqYeSPB9?g_st=iw',
    cardClass: 'haldi',
  },
  {
    id: 'wedding',
    name: 'Wedding',
    icon: '💍',
    date: '09 May 2026',
    time: '10:35 AM',
    venue: 'Brindavan Gardens',
    address: 'Opp ADR Hospital, Malkajgiri, Secunderabad',
    mapUrl: 'https://maps.app.goo.gl/yQH5xWKydL1KtyFa7?g_st=iw',
    cardClass: 'wedding',
  },
  {
    id: 'reception',
    name: 'Reception',
    icon: '🎉',
    date: '10 May 2026',
    time: '7:45 PM',
    venue: 'Vasara Convention A.C Hall',
    address: 'Karimnagar',
    mapUrl: 'https://maps.app.goo.gl/LYWV2vPYJQaB3Tb26?g_st=iw',
    cardClass: 'reception',
  },
]

const PETALS = ['🌸', '🌺', '🌼', '✿', '❀']

const PLAYLIST = [
  { name: 'Seetha Rama Kalyanam', src: '/music/seetha-rama-kalyanam.mp3' },
  { name: 'Mangala Vadyam · Shehnai', src: '/music/mangala-vadyam.mp3' },
  { name: 'Nadaswaram Wedding Mangalam', src: '/music/nadaswaram-mangalam.mp3' },
  { name: 'Sri Rama Jayarama (Telugu)', src: '/music/sri-rama-jayarama.mp3' },
]

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const now = Date.now()
      const diff = targetDate.getTime() - now
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return timeLeft
}

function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function Petals() {
  const items = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    emoji: PETALS[i % PETALS.length],
    left: `${(i * 8.3) % 100}%`,
    duration: `${8 + (i % 6) * 2}s`,
    delay: `${(i * 0.9) % 8}s`,
    size: `${1 + (i % 3) * 0.4}rem`,
  }))

  return (
    <>
      {items.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            bottom: '-2rem',
            fontSize: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </>
  )
}

function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const [trackIdx, setTrackIdx] = useState(0)
  const track = PLAYLIST[trackIdx]

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => {
        setPlaying(true)
        setShowHint(false)
      }).catch(() => {})
    }
  }, [playing])

  const nextTrack = useCallback(() => {
    setTrackIdx((i) => (i + 1) % PLAYLIST.length)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.load()
    if (playing) {
      audio.play().catch(() => setPlaying(false))
    }
  }, [trackIdx])

  return (
    <>
      <audio
        ref={audioRef}
        preload="none"
        src={track.src}
        onEnded={nextTrack}
      />
      <div className="music-controls">
        {playing && (
          <span className="now-playing" aria-live="polite">
            ♪ {track.name}
          </span>
        )}
        <button
          className="music-skip-btn"
          onClick={nextTrack}
          title="Next track"
          aria-label="Next track"
        >
          ⇥
        </button>
        <button
          className={`music-btn ${playing ? 'playing' : ''}`}
          onClick={toggle}
          title={playing ? 'Pause Music' : 'Play Music'}
          aria-label={playing ? 'Pause background music' : 'Play background music'}
        >
          {playing ? '⏸' : '♪'}
        </button>
      </div>
      {showHint && (
        <span
          style={{
            position: 'fixed',
            bottom: '5.5rem',
            right: '1.5rem',
            fontSize: '0.72rem',
            color: 'var(--gold-pale)',
            background: 'rgba(44,13,26,0.88)',
            padding: '0.35rem 0.85rem',
            borderRadius: '1rem',
            zIndex: 100,
            fontFamily: "'Cormorant Garamond', serif",
            border: '1px solid rgba(201,146,26,0.3)',
            whiteSpace: 'nowrap',
          }}
        >
          ♩ Tap to play wedding music
        </span>
      )}
    </>
  )
}

function CountdownSection() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE)
  const units = [
    { num: days, label: 'Days' },
    { num: hours, label: 'Hours' },
    { num: minutes, label: 'Minutes' },
    { num: seconds, label: 'Seconds' },
  ]

  return (
    <section id="countdown" className="countdown-section">
      <p className="section-label reveal">Counting Down To</p>
      <h2 className="section-title reveal">The Big Day</h2>
      <div className="ornament reveal">
        <span className="ornament-text">✦</span>
      </div>
      <div className="countdown-grid">
        {units.map(({ num, label }) => (
          <div className="countdown-box reveal" key={label}>
            <span className="countdown-num">{String(num).padStart(2, '0')}</span>
            <span className="countdown-label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function EventCard({ event }: { event: (typeof EVENTS)[0] }) {
  return (
    <div className={`event-card ${event.cardClass} reveal`}>
      <div className="event-card-header">
        <span className="event-icon">{event.icon}</span>
        <h3 className="event-name">{event.name}</h3>
      </div>
      <div className="event-card-body">
        <div className="event-detail">
          <span className="event-detail-icon">📅</span>
          <div className="event-detail-text">
            <strong>{event.date}</strong>
          </div>
        </div>
        <div className="event-detail">
          <span className="event-detail-icon">🕐</span>
          <div className="event-detail-text">
            <strong>{event.time}</strong>
          </div>
        </div>
        <div className="event-detail">
          <span className="event-detail-icon">📍</span>
          <div className="event-detail-text">
            <strong>{event.venue}</strong>
            {event.address !== event.venue && <span style={{ display: 'block', marginTop: '0.1rem' }}>{event.address}</span>}
          </div>
        </div>
        <a
          href={event.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="map-btn"
        >
          <span>🗺</span> View Location
        </a>
      </div>
    </div>
  )
}

function NavDots() {
  const sections = ['hero', 'countdown', 'events', 'closing']
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.5 }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="nav-dots" aria-label="Section navigation">
      {sections.map((id) => (
        <button
          key={id}
          className={`nav-dot ${active === id ? 'active' : ''}`}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          aria-label={`Go to ${id} section`}
          title={id.charAt(0).toUpperCase() + id.slice(1)}
        />
      ))}
    </nav>
  )
}

export default function WeddingInvitation() {
  useRevealOnScroll()

  return (
    <>
      <NavDots />
      <MusicPlayer />

      {/* ── HERO ──────────────────────────────────── */}
      <section id="hero" className="hero">
        <Petals />
        <span className="hero-corner tl">❃</span>
        <span className="hero-corner tr">❃</span>
        <span className="hero-corner bl">❃</span>
        <span className="hero-corner br">❃</span>

        <div className="hero-inner">
          <span className="hero-tag">Wedding Invitation</span>

          <div style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(3.5rem, 10vw, 6.5rem)',
            color: '#fff',
            lineHeight: 1.05,
            animation: 'fadeUp 1s ease 0.2s both',
            textShadow: '0 0 40px rgba(201,146,26,0.35)',
          }}>
            Rahul
          </div>

          <span className="hero-amp">&amp;</span>

          <div style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(3.5rem, 10vw, 6.5rem)',
            color: '#fff',
            lineHeight: 1.05,
            animation: 'fadeUp 1s ease 0.35s both',
            textShadow: '0 0 40px rgba(201,146,26,0.35)',
          }}>
            Nitisha
          </div>

          <div className="ornament" style={{ animation: 'fadeUp 1s ease 0.5s both' }}>
            <span className="ornament-text" style={{ color: 'var(--gold-light)' }}>✦</span>
          </div>

          <p className="hero-subtitle">
            Together with their families, invite you to celebrate their wedding festivities.
          </p>

          <div style={{ marginTop: '2.5rem', animation: 'fadeUp 1s ease 0.7s both' }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '0.8rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--gold-pale)',
              marginBottom: '0.35rem',
            }}>
              Save The Date
            </p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
              color: 'var(--gold-light)',
              letterSpacing: '0.05em',
            }}>
              08 · 09 · 10  May 2026
            </p>
          </div>

          <button
            onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              marginTop: '3rem',
              padding: '0.8rem 2.5rem',
              borderRadius: '2rem',
              border: '1.5px solid var(--gold-light)',
              background: 'transparent',
              color: 'var(--gold-pale)',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.05rem',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              animation: 'fadeUp 1s ease 0.85s both',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(201,146,26,0.15)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            View Events ↓
          </button>
        </div>
      </section>

      {/* ── COUNTDOWN ─────────────────────────────── */}
      <CountdownSection />

      {/* ── EVENTS ────────────────────────────────── */}
      <section id="events" className="events-section">
        <p className="section-label reveal">Join Us For</p>
        <h2 className="section-title reveal">Wedding Festivities</h2>
        <div className="ornament reveal">
          <span className="ornament-text">✦</span>
        </div>
        <p className="reveal" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          color: 'var(--text-mid)',
          fontSize: '1.1rem',
          maxWidth: '480px',
          margin: '0 auto',
        }}>
          Three days of joy, love, and celebrations across two cities.
        </p>
        <div className="events-grid">
          {EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* ── CLOSING ───────────────────────────────── */}
      <section id="closing" className="closing-section">
        <div className="ornament reveal">
          <span className="ornament-text">✦</span>
        </div>
        <p className="closing-tagline reveal">With Love &amp; Joy</p>
        <p className="closing-text reveal">
          We look forward to your blessings and presence as we begin this beautiful journey together.
        </p>
        <div className="closing-flowers reveal">🌸 🌺 🌼 🌺 🌸</div>
        <p className="reveal" style={{
          marginTop: '2.5rem',
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
          color: 'rgba(253,243,208,0.7)',
        }}>
          Rahul &amp; Nitisha
        </p>
        <p className="reveal" style={{
          marginTop: '1rem',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '0.8rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(201,146,26,0.6)',
        }}>
          09 · 05 · 2026
        </p>
      </section>
    </>
  )
}
