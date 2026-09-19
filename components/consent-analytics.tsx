'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

const CONSENT_KEY = 'quinx-analytics-consent'

export default function ConsentAnalytics() {
  const [choice, setChoice] = useState<string | null>(null)
  const analyticsId = process.env.NEXT_PUBLIC_GA_ID

  useEffect(() => {
    setChoice(window.localStorage.getItem(CONSENT_KEY))
  }, [])

  function choose(value: 'accepted' | 'declined') {
    window.localStorage.setItem(CONSENT_KEY, value)
    setChoice(value)
  }

  return <>
    {analyticsId && choice === 'accepted' && <><Script src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} strategy="afterInteractive" /><Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${analyticsId}');`}</Script></>}
    {analyticsId && choice === null && <aside className="consent-banner" role="region" aria-label="Analytics cookie preferences"><p>QUINX uses optional analytics to understand website usage and improve the experience.</p><div><button type="button" onClick={() => choose('declined')}>Decline</button><button type="button" onClick={() => choose('accepted')}>Accept analytics</button></div></aside>}
  </>
}
