'use client'

import { useCallback, useLayoutEffect, useRef } from 'react'
import Lenis from 'lenis'
import './ScrollStack.css'

type ScrollStackProps = {
  children: React.ReactNode
  className?: string
  itemDistance?: number
  itemScale?: number
  itemStackDistance?: number
  stackPosition?: string
  scaleEndPosition?: string
  baseScale?: number
  rotationAmount?: number
  blurAmount?: number
  useWindowScroll?: boolean
  onStackComplete?: () => void
}

type ScrollStackItemProps = { children: React.ReactNode; itemClassName?: string }

export function ScrollStackItem({ children, itemClassName = '' }: ScrollStackItemProps) {
  return <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
}

const clampProgress = (value: number, start: number, end: number) => {
  if (value < start) return 0
  if (value > end) return 1
  return (value - start) / (end - start || 1)
}

export default function ScrollStack({ children, className = '', itemDistance = 100, itemScale = .03, itemStackDistance = 30, stackPosition = '20%', scaleEndPosition = '10%', baseScale = .85, rotationAmount = 0, blurAmount = 0, useWindowScroll = false, onStackComplete }: ScrollStackProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const cardsRef = useRef<HTMLElement[]>([])
  const completedRef = useRef(false)
  const updatingRef = useRef(false)

  const parsePercentage = useCallback((value: string, height: number) => value.includes('%') ? (parseFloat(value) / 100) * height : parseFloat(value), [])
  const getScrollData = useCallback(() => {
    if (useWindowScroll) return { scrollTop: window.scrollY, containerHeight: window.innerHeight }
    const scroller = scrollerRef.current
    return { scrollTop: scroller?.scrollTop ?? 0, containerHeight: scroller?.clientHeight ?? window.innerHeight }
  }, [useWindowScroll])
  const getOffset = useCallback((element: HTMLElement) => useWindowScroll ? element.getBoundingClientRect().top + window.scrollY : element.offsetTop, [useWindowScroll])

  const updateCards = useCallback(() => {
    if (!cardsRef.current.length || updatingRef.current) return
    updatingRef.current = true
    const { scrollTop, containerHeight } = getScrollData()
    const stackStart = parsePercentage(stackPosition, containerHeight)
    const scaleEnd = parsePercentage(scaleEndPosition, containerHeight)
    const endElement = scrollerRef.current?.querySelector<HTMLElement>('.scroll-stack-end')
    const endTop = endElement ? getOffset(endElement) : 0
    let topCardIndex = 0

    cardsRef.current.forEach((card, index) => {
      const cardTop = getOffset(card)
      const triggerStart = cardTop - stackStart - itemStackDistance * index
      const triggerEnd = cardTop - scaleEnd
      const progress = clampProgress(scrollTop, triggerStart, triggerEnd)
      const scale = 1 - progress * (1 - (baseScale + index * itemScale))
      if (scrollTop >= triggerStart) topCardIndex = index
      const pinStart = triggerStart
      const pinEnd = endTop - containerHeight / 2
      const pinned = scrollTop >= pinStart && scrollTop <= pinEnd
      const translateY = pinned ? scrollTop - cardTop + stackStart + itemStackDistance * index : scrollTop > pinEnd ? pinEnd - cardTop + stackStart + itemStackDistance * index : 0
      const depth = Math.max(0, topCardIndex - index)
      const blur = index < topCardIndex ? depth * blurAmount : 0
      card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${index * rotationAmount * progress}deg)`
      card.style.filter = blur ? `blur(${blur}px)` : ''
      if (index === cardsRef.current.length - 1) {
        const inView = scrollTop >= pinStart && scrollTop <= pinEnd
        if (inView && !completedRef.current) { completedRef.current = true; onStackComplete?.() }
        if (!inView) completedRef.current = false
      }
    })
    updatingRef.current = false
  }, [baseScale, blurAmount, getOffset, getScrollData, itemScale, itemStackDistance, onStackComplete, parsePercentage, rotationAmount, scaleEndPosition, stackPosition])

  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const cards = Array.from(scroller.querySelectorAll<HTMLElement>('.scroll-stack-card'))
    cardsRef.current = cards
    cards.forEach((card, index) => {
      if (index < cards.length - 1) card.style.marginBottom = `${itemDistance}px`
      card.style.willChange = 'transform, filter'
      card.style.transformOrigin = 'top center'
      card.style.backfaceVisibility = 'hidden'
    })

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const onScroll = () => updateCards()
    const onResize = () => updateCards()
    const scrollTarget = useWindowScroll ? window : scroller
    scrollTarget.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    if (!reduceMotion) {
      const lenis = new Lenis({ smoothWheel: true, syncTouch: true, lerp: .1 })
      lenis.on('scroll', updateCards)
      lenisRef.current = lenis
      const raf = (time: number) => {
        lenis.raf(time)
        updateCards()
        animationFrameRef.current = requestAnimationFrame(raf)
      }
      animationFrameRef.current = requestAnimationFrame(raf)
    }
    updateCards()
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      lenisRef.current?.destroy()
      lenisRef.current = null
      scrollTarget.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cardsRef.current = []
    }
  }, [itemDistance, updateCards, useWindowScroll])

  return <div className={`scroll-stack-scroller ${useWindowScroll ? 'scroll-stack-scroller--window' : ''} ${className}`.trim()} ref={scrollerRef}><div className="scroll-stack-inner">{children}<div className="scroll-stack-end" /></div></div>
}