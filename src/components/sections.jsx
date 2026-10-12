import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { Reveal, Particles, Type, Cards } from './ui.jsx'

export function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  useEffect(() => {
    const f = () => {
      let c = 'home'
      ;['about', 'ventures', 'process', 'contact'].forEach((id) => {
        const e = document.getElementById(id)
        if (e && e.getBoundingClientRect().top < 140) c = id
      })
      setActive(c)
    }
    window.addEventListener('scroll', f)
    return () => window.removeEventListener('scroll', f)
  }, [])
  const links = [['home', 'Home'], ['about', 'About'], ['ventures', 'Ventures'], ['process', 'Process'], ['contact', 'Contact']]
  return (
    <nav>
      <div className="wrap">
        <a href="#home" className="logo"><img src={logo} alt="AVC logo" />AMERICAN VENTURA</a>
        <button className="burger" onClick={() => setOpen(!open)}>☰</button>
        <div className={'links' + (open ? ' open' : '')} onClick={() => setOpen(false)}>
          {links.map(([id, t]) => (
            <a key={id} href={'#' + id} className={active === id ? 'on' : ''}>{t}</a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export function Hero() {
  return (
    <header id="home" className="hero">
      <Particles />
      <div className="wrap in hr">
        <div className="ht">
          <span className="tag">Technology & Venture</span>
          <h1>Building today for <span>a better tomorrow.</span></h1>
          <p>
            We are a <Type words={['technology company.', 'venture builder.', 'innovation partner.']} />{' '}
            American Ventura Corporation develops digital products and businesses designed for the future.
          </p>
          <div className="cta">
            <a href="#contact" className="btn red">Contact Us</a>
            <a href="#ventures" className="btn ghost">Explore Ventures</a>
          </div>
        </div>
        <img className="hl" src={logo} alt="American Ventura Corporation logo" />
      </div>
    </header>
  )
}

export function Marquee() {
  const items = ['Technology & Venture', 'Innovation', 'Partnership', 'Growth', 'Building today for a better tomorrow']
  const loop = [...items, ...items]
  return (
    <div className="marquee">
      <div className="track">
        {[0, 1].map((n) => (
          <div className="group" key={n} aria-hidden={n === 1}>
            {loop.map((t, i) => (
              <span className="mi" key={i}>
                <img src={logo} alt="" />
                {t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="sec">
      <div className="wrap">
        <h2>About</h2><div className="bar" />
        <p className="lead">
          American Ventura Corporation (AVC) builds and develops technology-driven ventures with a long-term vision for growth.
          We create scalable technologies, support meaningful innovation, and develop ventures designed for tomorrow's opportunities.
        </p>
        <Cards items={[
          ['💡', 'Innovation', 'Building scalable technologies and forward-thinking digital ventures.'],
          ['🤝', 'Partnership', 'Supporting meaningful innovation through trusted, long-term relationships.'],
          ['📈', 'Growth', "Developing ventures designed for tomorrow's opportunities and markets."],
        ]} />
      </div>
    </section>
  )
}

const V = {
  All: [['🚀', 'Launchpad', 'Idea-to-product studio for early-stage startups.'], ['☁️', 'CloudCore', 'Scalable cloud platforms for modern businesses.'], ['🤖', 'AI Labs', 'Applied AI tools that automate real work.'], ['💳', 'PayBridge', 'Secure fintech infrastructure.']],
  Software: [['☁️', 'CloudCore', 'Scalable cloud platforms for modern businesses.'], ['🤖', 'AI Labs', 'Applied AI tools that automate real work.']],
  Business: [['🚀', 'Launchpad', 'Idea-to-product studio for early-stage startups.'], ['💳', 'PayBridge', 'Secure fintech infrastructure.']],
}

export function Ventures() {
  const [tab, setTab] = useState('All')
  return (
    <section id="ventures" className="sec soft">
      <div className="wrap">
        <h2>Our Ventures</h2><div className="bar" />
        <p className="lead">A growing portfolio of products and companies built on technology.</p>
        <div className="tabs">
          {Object.keys(V).map((k) => (
            <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{k}</button>
          ))}
        </div>
        <Cards key={tab} items={V[tab]} />
      </div>
    </section>
  )
}

export function Process() {
  const P = [['Discover', 'We study markets and find real opportunities.'], ['Build', 'Rapid, scalable engineering from day one.'], ['Launch', 'Go-to-market with trusted partners.'], ['Grow', 'Long-term support and expansion.']]
  return (
    <section id="process" className="sec">
      <div className="wrap">
        <h2>How We Work</h2><div className="bar" />
        <div className="tl">
          {P.map(([t, d], i) => (
            <Reveal key={t}>
              <div className="step">
                <b>{i + 1}</b>
                <div><h3 style={{ margin: '0 0 4px' }}>{t}</h3><p className="lead" style={{ margin: 0 }}>{d}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Voices() {
  const Q = [['“AVC turned our idea into a real product, fast.”', '— Startup Founder'], ['“A reliable long-term partner in technology.”', '— Strategic Partner'], ['“Forward-thinking team with real execution.”', '— Investor']]
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % 3), 4000)
    return () => clearInterval(id)
  }, [])
  return (
    <section className="dark">
      <div className="wrap">
        <h2>What Partners Say</h2><div className="bar" />
        <div className="quote">{Q[i][0]}<br /><small style={{ color: '#ff8ea0' }}>{Q[i][1]}</small></div>
        <div className="dots">{Q.map((_, k) => <i key={k} className={i === k ? 'on' : ''} onClick={() => setI(k)} />)}</div>
      </div>
    </section>
  )
}

const FORM_EMAIL = 'uzairranamuhammad7@gmail.com' // form ke messages yahan aayenge
const SHOW_EMAIL = 'info@americanventura.com'     // website par ye email dikhegi

export function Contact() {
  const [f, setF] = useState({ n: '', e: '', m: '' })
  const [status, setStatus] = useState('idle') // idle | sending | ok | error
  const u = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const send = async () => {
    if (!(f.n && f.e && f.m)) return
    setStatus('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${FORM_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: f.n,
          email: f.e,
          message: f.m,
          _subject: 'New message from americanventura.com',
          _replyto: f.e,
        }),
      })
      if (res.ok) { setStatus('ok'); setF({ n: '', e: '', m: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <section id="contact" className="sec soft">
      <div className="wrap">
        <h2>Contact</h2><div className="bar" />
        <p className="lead">
          For business, partnership, and strategic inquiries:{' '}
          <a href={`mailto:${SHOW_EMAIL}`} style={{ color: 'var(--red)', fontWeight: 700 }}>{SHOW_EMAIL}</a>
        </p>
        <form onSubmit={(e) => e.preventDefault()}>
          <input placeholder="Your name" value={f.n} onChange={u('n')} />
          <input placeholder="Email" type="email" value={f.e} onChange={u('e')} />
          <textarea rows="4" placeholder="Message" value={f.m} onChange={u('m')} />
          <button className="btn red" type="button" onClick={send} disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'ok' && <div className="ok">Thank you! We will get back to you soon.</div>}
          {status === 'error' && <div className="ok" style={{ background: '#fde8ec', color: '#9b1c31' }}>Message send nahi hua, dobara try karein.</div>}
        </form>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer>
      <img className="fl" src={logo} alt="AVC" /><br />
      © 2026 American Ventura Corporation. All rights reserved.
    </footer>
  )
}
