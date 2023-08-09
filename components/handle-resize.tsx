// cspell:ignore Resizer
'use client'
import { isSmallScreenAtom } from '@/atoms'
import { useAtom } from 'jotai'
import { PropsWithChildren, useEffect } from 'react'

export const Resizer = ({ children }: PropsWithChildren) => {
  const [isSmallScreen, setIsSmallScreen] = useAtom(isSmallScreenAtom)
  const handleResize = (setIsSmallScreen: any, _e?: UIEvent) => {
    setIsSmallScreen(window.innerWidth <= 700 ? true : false)
  }

  useEffect(() => {
    if (isSmallScreen && window.innerWidth >= 700) setIsSmallScreen(false)
    if (!isSmallScreen && window.innerWidth <= 700) setIsSmallScreen(true)
  }, [setIsSmallScreen, isSmallScreen])

  useEffect(() => {
    window.addEventListener(
      'resize',
      handleResize.bind(window, setIsSmallScreen)
    )
    return () =>
      window.removeEventListener(
        'resize',
        handleResize.bind(window, setIsSmallScreen)
      )
  })
  return <>{children}</>
}
