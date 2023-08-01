'use strict'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import Providers from './providers'

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
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
