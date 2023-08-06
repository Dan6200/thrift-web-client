// cspell:ignore Resizer
'use client'
import { isMobileAtom } from '@/atoms'
import { useSetAtom } from 'jotai'
import { PropsWithChildren, useEffect } from 'react'

export const Resizer = ({ children }: PropsWithChildren) => {
  const setIsMobile = useSetAtom(isMobileAtom)
  const handleResize = (setIsMobile: any, _e?: UIEvent) => {
    setIsMobile(window.innerWidth <= 400 ? true : false)
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize.bind(window, setIsMobile))
    return () =>
      window.removeEventListener(
        'resize',
        handleResize.bind(window, setIsMobile)
      )
  })
  return <>{children}</>
}
