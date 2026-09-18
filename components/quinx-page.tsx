'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import ScrollExpand from './ScrollExpand'
import ScrollStack, { ScrollStackItem } from './ScrollStack'

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

const reveal = { hidden: { opacity: 0, y: 42, scale: .96 }, visible: { opacity: 1, y: 0, scale: 1 } }

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .18, margin: '0px 0px -8% 0px' }} transition={{ duration: reduce ? 0 : .82, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

function Intro() {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), reduce ? 0 : 1250)
    return () => window.clearTimeout(timer)
  }, [reduce])

  return <AnimatePresence>{visible && <motion.div className="intro" initial={{ opacity: 1 }} exit={{ clipPath: 'inset(0 0 100% 0)', scale: 1.03 }} transition={{ duration: reduce ? 0 : .85, ease: [0.76, 0, 0.24, 1] }} aria-label="Loading QUINX">
    <motion.div className="intro-mark" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : .65, ease: [0.22, 1, 0.36, 1] }}>QUINX<span>®</span></motion.div>
    <motion.div className="intro-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: reduce ? 0 : .25, duration: reduce ? 0 : .7, ease: [0.76, 0, 0.24, 1] }} />
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduce ? 0 : .45, duration: reduce ? 0 : .4 }}>Design · Build · Grow</motion.p>
  </motion.div>}</AnimatePresence>
}

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const links = ['Services', 'About']
  return <motion.header className={`site-nav ${scrolled ? 'site-nav--scrolled' : ''}`} initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .9, duration: .7, ease: [0.22, 1, 0.36, 1] }}>
    <motion.a href="#top" className="wordmark" aria-label="Quinx home" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: .6 }}>QUINX<span>®</span></motion.a>
    <nav className="desktop-nav">{links.map((link, i) => <motion.a key={link} href={`#${link.toLowerCase()}`} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 + i * .08, duration: .5 }}>{link}</motion.a>)}<motion.a href="#contact" className="nav-contact" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: .5 }}>Start a project <ArrowUpRight size={14} /></motion.a></nav>
    <button className="menu-button" onClick={() => setOpen(value => !value)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
    <AnimatePresence>{open && <motion.div className="mobile-menu" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: .35, ease: [0.22, 1, 0.36, 1] }}>
      <div className="mobile-links">{links.map((link, i) => <motion.a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .06 }}>{link}<ArrowUpRight /></motion.a>)}<motion.a href="#contact" onClick={() => setOpen(false)} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: links.length * .06 }}>Start a project <ArrowUpRight /></motion.a></div>
      <p>Independent digital agency<br />Design · Build · Grow</p>
    </motion.div>}</AnimatePresence>
  </motion.header>
}

export function QuinxPage() {
  const reduce = useReducedMotion()
  return <main id="top" className="quinx-shell">
    <Intro />
    <Nav />
    <section className="hero">
      <div className="hero-grid" />
      <motion.div className="hero-orbit" animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} />
      <div className="hero-copy">
        <Reveal><p className="eyebrow">Independent digital agency <span>— 2026</span></p></Reveal>
        <Reveal delay={.1}><h1><span className="hero-line"><motion.span initial={{ opacity: 0, y: '110%' }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35, duration: reduce ? 0 : .8, ease: [0.22, 1, 0.36, 1] }}>We design it.</motion.span></span><span className="hero-line"><motion.span initial={{ opacity: 0, y: '110%' }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .48, duration: reduce ? 0 : .8, ease: [0.22, 1, 0.36, 1] }}>We build it.</motion.span></span><span className="hero-line"><motion.span initial={{ opacity: 0, y: '110%' }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .61, duration: reduce ? 0 : .8, ease: [0.22, 1, 0.36, 1] }}><em>We grow it.</em></motion.span></span></h1></Reveal>
        <Reveal delay={.76}><p className="hero-intro">Websites, digital products, brands and growth systems for ambitious businesses.</p></Reveal>
        <Reveal delay={.9}><a className="contact-link" href="#contact">Start a project <ArrowUpRight /></a></Reveal>
      </div>
      <motion.a className="scroll-cue" href="#manifesto" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.12, duration: .6 }}>Scroll to explore <ArrowDownRight /></motion.a>
      <motion.span className="hero-index" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: .6 }}>01 / 08</motion.span>
    </section>

    <section className="scroll-feature" aria-label="QUINX digital agency feature"><ScrollExpand src="/icon.svg" alt="QUINX mark" title="Design. Build. Grow." scrollHint="Scroll to expand" startWidth={42} startHeight={58} startRadius={24} endRadius={0} mediaZoom={1.35} scrollDistance={1.2} holdDistance={.35} smoothing={.1} overlayScrim={.45} useWindowScroll><p className="eyebrow">The QUINX approach</p><p>Websites, digital products, brands and growth systems for ambitious businesses.</p></ScrollExpand></section>

    <section className="manifesto section-pad" id="manifesto"><Reveal><p className="eyebrow">Our point of view</p><h2>Your digital presence should do more than exist.<br /><span>It should communicate.<br />It should perform.<br />It should be remembered.</span></h2></Reveal><Reveal delay={.12} className="manifesto-note"><p>We bring design, technology, content and marketing together to create the things that should exist. No safe bets. No borrowed language. Just clear thinking made visible.</p></Reveal></section>
    <section className="marquee" aria-label="Built for ambitious businesses"><div>{['Northstar', 'Monument', 'Aster', 'Parallel', 'Form', 'Nexa', 'Arc', 'Modo'].map(item => <span key={item}>{item}<i>*</i></span>)}{['Northstar', 'Monument', 'Aster', 'Parallel', 'Form', 'Nexa', 'Arc', 'Modo'].map(item => <span key={`${item}-repeat`}>{item}<i>*</i></span>)}</div></section>

    <section className="services section-pad" id="services"><Reveal><p className="eyebrow">Capabilities</p><h2>What we do</h2></Reveal><div className="services-list service-reveals">{services.map(([number, group, title, description], index) => <Reveal key={title} delay={index * .06} className="service-row"><span>{number}</span><h3>{group} <small>— {title}</small></h3><p>{description}</p><ArrowUpRight aria-hidden="true" /></Reveal>)}</div></section>

    <section className="statement section-pad"><Reveal><p className="eyebrow">Why Quinx</p><h2>One studio.<br /><span>The whole digital picture.</span></h2></Reveal><Reveal delay={.12} className="manifesto-note"><p>Instead of managing disconnected agencies, you get one considered point of view from first idea to lasting growth.</p></Reveal></section>
    <section className="process section-pad"><Reveal><p className="eyebrow">Our process</p><h2>From idea to impact.</h2></Reveal><ScrollStack className="process-stack" itemDistance={300} itemScale={.015} itemStackDistance={190} stackPosition="18%" scaleEndPosition="8%" baseScale={.96} rotationAmount={0} blurAmount={0} useWindowScroll>{process.map(([number, title, description]) => <ScrollStackItem key={number} itemClassName="process-card"><article><span>{number}</span><h3>{title}</h3><p>{description}</p></article></ScrollStackItem>)}</ScrollStack></section>
    <section className="about section-pad" id="about"><Reveal><p className="eyebrow">About Quinx</p><h2>We combine creativity with technology to build brands people remember.</h2></Reveal><Reveal delay={.12} className="about-copy"><p>QUINX is an independent digital agency working across design, development, content and growth. We partner with ambitious businesses to create digital experiences that look distinctive, work beautifully and generate results.</p></Reveal></section>
    <section className="contact" id="contact"><Reveal><p className="eyebrow">Have something worth building?</p><h2>Tell us what you&apos;re working on.<br /><em>We&apos;ll figure out the rest.</em></h2><a className="contact-link" href="mailto:digital.quinx@gmail.com">digital.quinx@gmail.com <ArrowUpRight /></a></Reveal></section>
    <motion.footer initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .5 }} transition={{ duration: reduce ? 0 : .8, ease: [0.22, 1, 0.36, 1] }}><motion.span initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: .15 }}>QUINX</motion.span><motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .25 }}>Digital agency for ambitious businesses.</motion.span><motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .35 }}>© 2026 QUINX. All rights reserved.</motion.span></motion.footer>
  </main>
}

export default QuinxPage
