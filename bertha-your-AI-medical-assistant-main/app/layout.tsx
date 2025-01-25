import type { Metadata } from 'next'
import { Crimson_Text } from 'next/font/google'
import './globals.css'

const crimsonText = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-crimson',
})

export const metadata: Metadata = {
  title: 'Bertha - AI Medical Assistant',
  description: 'Your personal AI medical assistant',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={crimsonText.variable}>{children}</body>
    </html>
  )
}

