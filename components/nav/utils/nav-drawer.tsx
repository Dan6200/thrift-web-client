// cspell:ignore SwipeableDrawer
import { Button, SwipeableDrawer } from '@mui/material'
import { useState } from 'react'

export const NavDrawer = () => {
  const [isOpen, toggleDrawer] = useState(false)
  return (
    <>
      <Button onClick={() => toggleDrawer(true)}>Menu</Button>
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      >
        Menu
      </SwipeableDrawer>
    </>
  )
}
