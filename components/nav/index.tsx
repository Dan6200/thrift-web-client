'use client'
import React from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { isSmallScreenAtom, userAtom } from '@/atoms'
import { NavMenu } from './utils/nav-menu'
import { NavDrawer } from './utils/nav-drawer'

export function Nav() {
  const [user, setUser] = useAtom(userAtom)
  const isSmallScreen = useAtomValue(isSmallScreenAtom)
  return (
    <>
      {isSmallScreen ? (
        <NavDrawer user={user} setUser={setUser} />
      ) : (
        <NavMenu user={user} setUser={setUser} />
      )}
    </>
  )
}
