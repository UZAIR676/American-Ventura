import { useEffect, useRef, useState } from 'react'

export function Reveal({ children }) {
  const r = useRef()
  useEffect(() => {
    const o = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && x.target.classList.add('show')),
      { threshold: 0.15 }
    )
    o.observe(r.current)
    return () => o.disconnect()
  }, [])
  return <div className="rev" ref={r}>{children}</div>
}

export function Particles() {
  const c = useRef()
  useEffect(() => {
    const cv = c.current, x = cv.getContext('2d')
    let w, hh, raf
    const P = Array.from({ length: 70 }, () => ({
      x: Math.random() * 2000, y: Math.random() * 1000,
      vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() < 0.2,
    }))
    const rs = () => { w = cv.width = cv.offsetWidth; hh = cv.height = cv.offsetHeight }
    rs()
    window.addEventListener('resize', rs)
    const loop = () => {
      x.clearRect(0, 0, w, hh)
      P.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > hh) p.vy *= -1
        x.fillStyle = p.r ? '#ff4d66' : '#8fb2ff'
        x.beginPath(); x.arc(p.x, p.y, 2.2, 0, 7); x.fill()
        for (let j = i + 1; j < P.length; j++) {
          const q = P[j], d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < 120) {
            x.strokeStyle = `rgba(143,178,255,${(1 - d / 120) * 0.35})`
            x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(q.x, q.y); x.stroke()
          }
        }
      })
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', rs) }
  }, [])
  return <canvas ref={c} />
}

export function Count({ to, suf = '' }) {
  const [n, setN] = useState(0)
  const r = useRef()
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      o.disconnect()
      let t = 0
      const id = setInterval(() => {
        t += to / 50
        if (t >= to) { t = to; clearInterval(id) }
        setN(Math.round(t))
      }, 30)
    })
    o.observe(r.current)
    return () => o.disconnect()
  }, [to])
  return <b ref={r}>{n}{suf}</b>
}

export function Type({ words }) {
  const [i, setI] = useState(0)
  const [t, setT] = useState('')
  useEffect(() => {
    const w = words[i % words.length]
    let k = 0, del = false
    const id = setInterval(() => {
      if (!del) { k++; setT(w.slice(0, k)); if (k === w.length) del = true }
      else { k--; setT(w.slice(0, k)); if (k === 0) { clearInterval(id); setI(i + 1) } }
    }, del ? 40 : 90)
    return () => clearInterval(id)
  }, [i])
  return <span>{t}|</span>
}

export function Cards({ items }) {
  return (
    <div className="grid">
      {items.map(([icon, title, text]) => (
        <Reveal key={title}>
          <div className="card">
            <div className="ic">{icon}</div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
