import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import ConsentAnalytics from '@/components/consent-analytics'
import './globals.css'

const siteUrl = 'https://v0-veyra-blush-five.vercel.app'
const siteTitle = 'QUINX | Independent Digital Agency'
const siteDescription = 'QUINX is an independent digital agency in Nagpur, Maharashtra, providing SEO, digital marketing, website design, web development, digital products, branding and growth solutions for ambitious businesses.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  verification: {
    google: 'Bnw2aqZnVWcPy02iihL0tVCBiehDB0RnzMyLKhPxZfc',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: 'website',
    url: siteUrl,
    siteName: 'QUINX',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: siteTitle,
    description: siteDescription,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#101110',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <ConsentAnalytics />
      </body>
    </html>
  )
}
