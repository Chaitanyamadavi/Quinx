'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Menu, Plus, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const projects = [
  { title: 'Kanso House', type: 'Brand world / Digital', year: '2024', className: 'work-kanso' },
  { title: 'Noma Systems', type: 'Identity / Experience', year: '2023', className: 'work-noma' },
  { title: 'Aether Objects', type: 'Strategy / Campaign', year: '2024', className: 'work-aether' },
]

const services = [
  ['01', 'Brand Strategy', 'Positioning, identity systems, and the sharp point of view that makes a brand impossible to ignore.'],
  ['02', 'Digital Experiences', 'Websites and digital products with a clear rhythm, useful complexity, and a distinct sense of place.'],
  ['03', 'Creative Direction', 'Campaigns, content, and launch worlds that move culture forward — not just another content calendar.'],
]

const reveal = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} transition={{ duration: reduce ? 0 : 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

function Nav() {
  const [open, setOpen] = useState(false)
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])
  const links = ['Work', 'Services', 'About']
  return <header className="site-nav"><a href="#top" className="wordmark" aria-label="Veyra home">VEYRA<span>®</span></a><nav className="desktop-nav">{links.map(link => <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>)}<a href="#contact" className="nav-contact">Start a project <ArrowUpRight size={14} /></a></nav><button className="menu-button" onClick={() => setOpen(v => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button><AnimatePresence>{open && <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="mobile-links">{links.map((link, i) => <motion.a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .06 }}>{link}<ArrowUpRight /></motion.a>)}<a href="#contact" onClick={() => setOpen(false)}>Start a project <ArrowUpRight /></a></div><p>Independent creative studio<br />New York · London · Everywhere</p></motion.div>}</AnimatePresence></header>
}

export function VeyraPage() {
  const reduce = useReducedMotion()
  return <main id="top" className="veyra-shell"><Nav /><section className="hero"><div className="hero-grid" /><motion.div className="hero-orbit" animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} /><div className="hero-copy"><Reveal><p className="eyebrow">Independent creative studio <span>— 2026</span></p></Reveal><Reveal delay={.1}><h1>Make it <em>matter.</em></h1></Reveal><Reveal delay={.2}><p className="hero-intro">VEYRA builds brands, digital experiences, and ideas for the future-facing.</p></Reveal></div><a className="scroll-cue" href="#work">Scroll to explore <ArrowDownRight /></a><span className="hero-index">01 / 05</span></section><section className="manifesto section-pad"><Reveal><p className="eyebrow">Our point of view</p><h2>Good work gets attention.<br /><span>Great work earns belief.</span></h2></Reveal><Reveal delay={.12} className="manifesto-note"><p>We partner with ambitious people to create the things that should exist. No safe bets. No borrowed language. Just clear thinking made visible.</p><a className="text-link" href="#about">More about Veyra <ArrowUpRight /></a></Reveal></section><section className="marquee" aria-label="Selected clients"><div>{['Aesop', 'Arc’teryx', 'Morrow', 'Noma', 'Clover', 'Salomon'].map((x, i) => <span key={x}>{x}<i>*</i></span>)}</div></section><section className="work section-pad" id="work"><Reveal className="section-heading"><p className="eyebrow">Selected work</p><p>02 / 05</p></Reveal><div className="work-grid">{projects.map((project, i) => <Reveal key={project.title} delay={i * .08} className={`work-card ${project.className}`}><div className="work-art"><span>{project.title.split(' ')[0]}</span><div className="art-line" /></div><div className="work-meta"><div><h3>{project.title}</h3><p>{project.type}</p></div><p>{project.year} <ArrowUpRight /></p></div></Reveal>)}</div><a className="round-link" href="#contact">View all work <ArrowUpRight /></a></section><section className="services section-pad" id="services"><Reveal className="section-heading"><p className="eyebrow">What we do</p><p>03 / 05</p></Reveal><div className="services-list">{services.map(([num, title, body]) => <Reveal key={num}><article className="service-row"><span>{num}</span><h3>{title}</h3><p>{body}</p><Plus /></article></Reveal>)}</div></section><section className="statement section-pad"><Reveal><p className="eyebrow">Built for the in-between</p><h2>We turn <span>uncertainty</span><br />into momentum.</h2></Reveal></section><section className="process section-pad"><Reveal className="section-heading"><p className="eyebrow">Our process</p><p>04 / 05</p></Reveal><div className="process-grid">{[['01', 'Find the signal', 'We ask better questions and find the insight hiding in plain sight.'], ['02', 'Shape the story', 'We turn the signal into a world with a reason to exist.'], ['03', 'Make the mark', 'We build with care, precision, and enough tension to make it stick.']].map(([n, t, d]) => <Reveal key={n}><article><span>{n}</span><h3>{t}</h3><p>{d}</p></article></Reveal>)}</div></section><section className="about section-pad" id="about"><div><Reveal><p className="eyebrow">About Veyra</p><h2>A small team with<br /><em>big range.</em></h2></Reveal></div><Reveal className="about-copy" delay={.12}><p>We are strategists, designers, writers, and makers who believe the best work lives at the intersection of clarity and surprise.</p><p>From first thought to final pixel, we stay close, move quickly, and care about the details that most people miss.</p><a className="text-link" href="#contact">Meet the studio <ArrowUpRight /></a></Reveal></section><section className="contact" id="contact"><Reveal><p className="eyebrow">Have a good one?</p><h2>Let&apos;s make<br /><em>something matter.</em></h2><a className="contact-link" href="mailto:hello@veyra.studio">hello@veyra.studio <ArrowUpRight /></a></Reveal></section><footer><span>VEYRA®</span><span>Independent creative studio</span><span>© 2026</span><a href="#top">Back to top ↑</a></footer></main>
}

export default VeyraPage
