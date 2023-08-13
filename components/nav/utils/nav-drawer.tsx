// cspell:ignore SwipeableDrawer
import { SwipeableDrawer } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { PanelRightClose } from 'lucide-react'

export const NavDrawer = () => {
  const [isOpen, toggleDrawer] = useState(false)
  return (
    <div className="max-w-none flex flex-row items-center justify-between w-full px-4 py-4  border-b shadow-md dark:bg-background  dark:shadow-none">
      <Link href="/" className="text-2xl font-bold">
        Thrift Commerce
      </Link>
      <Button onClick={() => toggleDrawer(true)} variant="outline" size="icon">
        <HamburgerMenuIcon />
      </Button>
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      >
        <div className="container border-2 p-4 bg-background text-foreground h-full w-[70vw]">
          <Button
            onClick={() => toggleDrawer(false)}
            variant="outline"
            size="icon"
            className="border-none relative"
          >
            <PanelRightClose />
          </Button>
          <div className="flex flex-row p-4">Menu</div>
        </div>
      </SwipeableDrawer>
    </div>
  )
}
