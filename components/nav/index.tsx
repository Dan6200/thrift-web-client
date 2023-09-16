'use client'
import React from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { isSmallScreenAtom, userAtom } from '@/atoms'
import { NavMenu } from './utils/nav-menu'
import { NavMenuSmall } from './utils/nav-menu-small'

export function Nav() {
  const [user, setUser] = useAtom(userAtom)
  const isSmallScreen = useAtomValue(isSmallScreenAtom)
  return (
    <>
      {isSmallScreen ? (
        <NavMenuSmall user={user} setUser={setUser} />
      ) : (
        <NavMenu user={user} setUser={setUser} />
      )}
    </>
  )
}
