'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const services = [
  ['01', 'DESIGN', 'Website Design', 'Create websites that communicate clearly, feel distinctive and convert visitors into customers.'],
  ['02', 'DESIGN', 'UI / UX Design', 'Thoughtful interfaces designed around usability, clarity and visual impact.'],
  ['03', 'DESIGN', 'Branding', 'Build distinctive visual identities that make businesses recognizable and memorable.'],
  ['04', 'BUILD', 'Website Development', 'Fast, responsive and scalable websites built with modern technologies.'],
  ['05', 'BUILD', 'Web App Development', 'Custom web applications designed around real business requirements and workflows.'],
  ['06', 'GROW', 'SEO', 'Technical and content-driven SEO strategies designed to increase visibility and organic traffic.'],
  ['07', 'GROW', 'Copywriting', 'Clear, persuasive copy that communicates value and turns attention into action.'],
  ['08', 'GROW', 'Blog & Content', 'Research-driven articles and content designed to educate audiences and build long-term authority.'],
  ['09', 'GROW', 'Social Media Marketing', 'Content strategies and campaigns designed to build attention, engagement and community.'],
]

const process = [
  ['01', 'Discover', 'Understand the business, audience, goals and opportunity.'],
  ['02', 'Define', 'Create the strategy, structure and creative direction.'],
  ['03', 'Build', 'Design, develop and refine the final digital experience.'],
  ['04', 'Grow', 'Launch, optimize and continuously improve performance.'],
]

const reveal = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} transition={{ duration: reduce ? 0 : 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

function Nav() {
  const [open, setOpen] = useState(false)
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])
  const links = ['Services', 'About']
  return <header className="site-nav"><a href="#top" className="wordmark" aria-label="Quinx home">QUINX<span>®</span></a><nav className="desktop-nav">{links.map(link => <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>)}<a href="#contact" className="nav-contact">Start a project <ArrowUpRight size={14} /></a></nav><button className="menu-button" onClick={() => setOpen(v => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button><AnimatePresence>{open && <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="mobile-links">{links.map((link, i) => <motion.a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .06 }}>{link}<ArrowUpRight /></motion.a>)}<a href="#contact" onClick={() => setOpen(false)}>Start a project <ArrowUpRight /></a></div><p>Independent digital agency<br />Design · Build · Grow</p></motion.div>}</AnimatePresence></header>
}

export function QuinxPage() {
  const reduce = useReducedMotion()
  return <main id="top" className="veyra-shell"><Nav /><section className="hero"><div className="hero-grid" /><motion.div className="hero-orbit" animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} /><div className="hero-copy"><Reveal><p className="eyebrow">Independent digital agency <span>— 2026</span></p></Reveal><Reveal delay={.1}><h1>We design it.<br />We build it.<br /><em>We grow it.</em></h1></Reveal><Reveal delay={.2}><p className="hero-intro">Websites, digital products, brands and growth systems for ambitious businesses.</p></Reveal><Reveal delay={.3}><a className="contact-link" href="#contact">Start a project <ArrowUpRight /></a></Reveal></div><a className="scroll-cue" href="#manifesto">Scroll to explore <ArrowDownRight /></a><span className="hero-index">01 / 08</span></section><section className="manifesto section-pad" id="manifesto"><Reveal><p className="eyebrow">Our point of view</p><h2>Your digital presence should do more than exist.<br /><span>It should communicate.<br />It should perform.<br />It should be remembered.</span></h2></Reveal><Reveal delay={.12} className="manifesto-note"><p>We bring design, technology, content and marketing together to create the things that should exist. No safe bets. No borrowed language. Just clear thinking made visible.</p></Reveal></section><section className="marquee" aria-label="Built for ambitious businesses"><div>{['Northstar', 'Monument', 'Aster', 'Parallel', 'Form', 'Nexa', 'Arc', 'Modo'].map(x => <span key={x}>{x}<i>*</i></span>)}{['Northstar', 'Monument', 'Aster', 'Parallel', 'Form', 'Nexa', 'Arc', 'Modo'].map(x => <span key={`${x}-repeat`}>{x}<i>*</i></span>)}</div></section><section className="services section-pad" id="services"><Reveal><p className="eyebrow">Capabilities</p><h2>What we do</h2></Reveal><div className="services-list">{services.map(([number, group, title, description], i) => <Reveal key={title} delay={i * .03} className="service-row"><span>{number}</span><h3>{group} <small>— {title}</small></h3><p>{description}</p><ArrowUpRight /></Reveal>)}</div></section><section className="statement section-pad"><Reveal><p className="eyebrow">Why Veyra</p><h2>One studio.<br /><span>The whole digital picture.</span></h2></Reveal><Reveal delay={.12} className="manifesto-note"><p>Instead of managing disconnected agencies, you get one considered point of view from first idea to lasting growth.</p></Reveal></section><section className="process section-pad"><Reveal><p className="eyebrow">Our process</p><h2>From idea to impact.</h2></Reveal><div className="process-grid">{process.map(([number, title, description]) => <Reveal key={number}><article><span>{number}</span><h3>{title}</h3><p>{description}</p></article></Reveal>)}</div></section><section className="about section-pad" id="about"><Reveal><p className="eyebrow">About Veyra</p><h2>We combine creativity with technology to build brands people remember.</h2></Reveal><Reveal delay={.12} className="about-copy"><p>VEYRA is an independent digital agency working across design, development, content and growth. We partner with ambitious businesses to create digital experiences that look distinctive, work beautifully and generate results.</p></Reveal></section><section className="contact" id="contact"><Reveal><p className="eyebrow">Have something worth building?</p><h2>Tell us what you&apos;re working on.<br /><em>We&apos;ll figure out the rest.</em></h2><a className="contact-link" href="mailto:digital.quinx@gmail.com">digital.quinx@gmail.com <ArrowUpRight /></a></Reveal></section><footer><span>VEYRA</span><span>Digital agency for ambitious businesses.</span><span>© 2026 VEYRA. All rights reserved.</span></footer></main>
}

export default QuinxPage
