// cspell:ignore Resizer
'use strict'
import { Analytics } from '@vercel/analytics/react'
import { Lato } from 'next/font/google'
import { Resizer } from '@/components/handle-resize'
import { Nav } from '@/components/nav'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import Providers from './providers'

export const metadata = {
  title: 'Thrift eCommerce',
  description:
    'Thrift, an ecommerce platform to buy or sell any product. Still in development...',
}

const lato = Lato({ weight: '400', subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <Resizer>
              <Nav />
              {children}
            </Resizer>
            <Toaster />
          </Providers>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
