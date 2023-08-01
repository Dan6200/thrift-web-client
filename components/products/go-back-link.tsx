'use client'
import { useRouter } from 'next/navigation'
import { FC, ReactNode } from 'react'

interface GoBackLinkProps {
  className: string
  children: ReactNode
}

export const GoBackLink: FC<GoBackLinkProps> = ({ className, children }) => {
  const router = useRouter()
  return (
    <a className={className} onClick={() => router.back()}>
      {children}
    </a>
  )
}
