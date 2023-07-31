'use client'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

export const GoBackLink: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()
  return (
    <a className="" onClick={() => router.back()}>
      {children}
    </a>
  )
}
