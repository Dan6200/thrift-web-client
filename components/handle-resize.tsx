// cspell:ignore Resizer
'use client'
import { isSmallScreenAtom } from '@/atoms'
import { useSetAtom } from 'jotai'
import { PropsWithChildren, useEffect } from 'react'

export const Resizer = ({ children }: PropsWithChildren) => {
  const setIsSmallScreen = useSetAtom(isSmallScreenAtom)
  const handleResize = (setIsSmallScreen: any, _e?: UIEvent) => {
    setIsSmallScreen(window.innerWidth <= 700 ? true : false)
  }
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
