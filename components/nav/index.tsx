'use client'
import React from 'react'
import { useAtomValue } from 'jotai'
import { isSmallScreenAtom } from '@/atoms'
import { NavMenu } from './utils/nav-menu'
import { NavDrawer } from './utils/nav-drawer'

export function Nav() {
  const isSmallScreen = useAtomValue(isSmallScreenAtom)
  return (
    <>
      {isSmallScreen ? <NavDrawer /> : <NavMenu />}
      <div className="mx-auto w-[90%] mt-2 bg-red-500 text-center text-white p-2">
        <p>
          Note: This project is still under development and is constantly
          changing
        </p>
      </div>{' '}
    </>
  )
}
