'use strict'
// cspell:disable
import './globals.css'

export const metadata = {
  title: 'Thrift eCommerce',
  description: 'A thrift store for the modern age.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
