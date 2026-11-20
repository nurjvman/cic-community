
import { useState } from 'react'
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Menu,
  MessageCircle,
  Search,
  StickyNote,
  X,
} from 'lucide-react'
import SectionHeading from './components/SectionHeading'
import { agenda, discussions, notes, summaries } from './data/sample'

const nav = [
  { label: 'Home', href: '#home' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Library', href: '#library' },
  { label: 'Forum', href: '#forum' },
  { label: 'Sticky Wall', href: '#sticky' },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [noteOpen, setNoteOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [noteName, setNoteName] = useState('')
  const [localNotes, setLocalNotes] = useState(notes)

  function postNote() {
    if (!noteText.trim()) return

    setLocalNotes([
      {
        color: 'yellow',
        author: noteName.trim() || 'ANONIM',
        time: 'BARU SAJA',
        text: noteText.trim(),
        likes: 0,
        replies: 0,
      },
      ...localNotes,
    ])

    setNoteText('')
    setNoteName('')
    setNoteOpen(false)
  }

  return (
    <div id="home" className="site-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="CIC home">
          <span className="brand-mark">CIC.</span>
          <span className="brand-sub">CATATAN INFORMASI KULIAH</span>
        </a>

        <nav className="desktop-nav">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={item.label === 'Home' ? 'active' : ''}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="icon-button" aria-label="Cari">
            <Search size={19} />
          </button>
          <button
            className="icon-button menu-toggle"
            aria-label="Buka menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-menu">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              MANAJEMEN SIBERMU '11
            </div>

            <h1>
              Kuliah lebih terarah,
              <br />
              <em>nggak harus sendirian.</em>
            </h1>

            <p>
              Ruang berbagi informasi, catatan perkuliahan, dan percakapan
              mahasiswa dalam satu tempat.
            </p>

            <div className="hero-actions">
              <a className="button button-dark" href="#forum">
                Jelajahi Forum <ArrowUpRight size={16} />
              </a>
              <a className="button button-outline" href="#library">
                Lihat Rangkuman
              </a>
            </div>
          </div>

          <div className="hero-aside">
            <div className="hero-aside-top">
              A SHARED SPACE
              <br />
              FOR STUDENTS
            </div>
            <div className="hero-aside-number">
              11<span>TH</span>
            </div>
            <div className="hero-aside-bottom">LEARN · SHARE · GROW</div>
          </div>
        </section>

        <section className="section" id="agenda">
          <SectionHeading number="01" title="Agenda terdekat" link="LIHAT SEMUA" />
          <div className="agenda-card">
            {agenda.map((item, index) => (
              <article className="agenda-row" key={item.title}>
                <div className="date-block">
                  <strong>{item.day}</strong>
                  <span>{item.month}</span>
                </div>

                <div className="agenda-info">
                  {item.urgency && (
                    <span className="urgent-label">{item.urgency}</span>
                  )}
                  <h3>{item.title}</h3>
                  <p>{item.meta}</p>
                </div>

                <ArrowUpRight className="row-arrow" size={18} />

                {index < agenda.length - 1 && <div className="row-rule" />}
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="forum">
          <SectionHeading number="02" title="From the community" link="BUKA FORUM" />
          <div className="discussion-grid">
            {discussions.map((item, index) => (
              <article
                className={`discussion-card ${index === 0 ? 'featured' : ''}`}
                key={item.title}
              >
                <div className="card-top">
                  <span className="category-label">{item.category}</span>
                  <span className="tiny-index">THREAD / 0{index + 1}</span>
                </div>

                <h3>{item.title}</h3>
                <p>{item.body}</p>

                <div className="card-meta">
                  <span>{item.author} · {item.time}</span>
                  <span>
                    <MessageCircle size={14} /> {item.replies} balasan
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="sticky">
          <SectionHeading number="03" title="Sticky Wall" link="BUKA PAPAN" />

          <div className="sticky-intro">
            <p>
              Pesan singkat, sapaan, atau cerita kecil dari teman-teman.
              Menempel sebentar, menemani hari.
            </p>
            <span>48-HOUR NOTES</span>
          </div>

          <div className="sticky-grid">
            {localNotes.map((note, index) => (
              <article
                className={`sticky-card ${note.color}`}
                key={`${note.time}-${index}`}
              >
                <div className="sticky-meta">
                  <span>{note.author}</span>
                  <span>{note.time}</span>
                </div>
                <p>{note.text}</p>
                <div className="sticky-footer">
                  <span>♡ {note.likes}</span>
                  <span>↩ {note.replies}</span>
                </div>
              </article>
            ))}
          </div>

          <button className="add-note" onClick={() => setNoteOpen(true)}>
            <StickyNote size={17} />
            Tempelkan sticky note
            <span>Tanpa login · Hilang otomatis dalam 48 jam</span>
          </button>
        </section>

        <section className="section" id="library">
          <SectionHeading number="04" title="Latest notes" link="JELAJAHI LIBRARY" />

          <div className="summary-list">
            {summaries.map((item) => (
              <article className="summary-row" key={item.title}>
                <div className="summary-icon">
                  <BookOpen size={19} />
                </div>
                <div className="summary-info">
                  <span className="category-label">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.meta}</p>
                </div>
                <ArrowUpRight className="row-arrow" size={18} />
              </article>
            ))}
          </div>
        </section>

        <section className="closing-note">
          <CalendarDays size={19} />
          <p>
            Informasi tersimpan rapi. Pertanyaan punya ruang. Cerita kuliah
            punya tempat.
          </p>
          <span>SEE YOU AROUND.</span>
        </section>
      </main>

      <footer className="footer">
        <a className="footer-brand" href="#home">
          CIC.
        </a>
        <div>
          <p>
            Tempat informasi tersimpan, pertanyaan terjawab, dan cerita kuliah
            bertemu.
          </p>
          <span>
            CATATAN INFORMASI KULIAH · MANAJEMEN SIBERMU '11
          </span>
        </div>
        <span className="copyright">© 2026</span>
      </footer>

      {noteOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setNoteOpen(false)
            }
          }}
        >
          <section
            className="note-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="note-title"
          >
            <div className="modal-head">
              <div>
                <span className="eyebrow">STICKY WALL / 48 HOURS</span>
                <h2 id="note-title">Tempelkan pesanmu.</h2>
              </div>
              <button
                className="icon-button"
                aria-label="Tutup"
                onClick={() => setNoteOpen(false)}
              >
                <X />
              </button>
            </div>

            <label>
              Nama <span>(opsional, kosongkan untuk anonim)</span>
              <input
                value={noteName}
                onChange={(e) => setNoteName(e.target.value)}
                placeholder="Nama atau panggilan"
                maxLength={32}
              />
            </label>

            <label>
              Pesan
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Tulis sesuatu untuk teman-teman..."
                maxLength={240}
              />
            </label>

            <div className="modal-bottom">
              <span>{noteText.length}/240 karakter</span>
              <button
                className="button button-dark"
                onClick={postNote}
                disabled={!noteText.trim()}
              >
                Tempelkan note ↗
              </button>
            </div>

            <p className="demo-warning">
              Demo tampilan: pesan hanya tersimpan sementara di halaman ini,
              belum masuk database.
            </p>
          </section>
        </div>
      )}
    </div>
  )
}
