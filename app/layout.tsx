// cspell:ignore Resizer
'use strict'
import { Resizer } from '@/components/handle-resize'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import Providers from './providers'

export const metadata = {
  title: 'Thrift eCommerce',
  description: 'An eCommerce store for the modern Nigerian.',
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
          <Providers>
            <Resizer>{children}</Resizer>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
