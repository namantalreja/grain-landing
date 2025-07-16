import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Grain | Data: the way you need it',
  description: 'The data layer for AI. Transform raw data into AI-ready context.',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
