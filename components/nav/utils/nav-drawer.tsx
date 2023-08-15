// cspell:ignore SwipeableDrawer
import { SwipeableDrawer } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { PanelRightClose } from 'lucide-react'
import { components } from './nav-components'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/atoms'
import { ModeToggle } from '@/components/dark-mode-toggle'

export const NavDrawer = () => {
  const [isOpen, toggleDrawer] = useState(false)
  const user = useAtomValue(userAtom)
  return (
    <div className="max-w-none flex flex-row items-center justify-between w-full px-4 py-4  border-b shadow-md dark:shadow-none">
      <Link href="/" className="text-2xl font-bold">
        Thrift
      </Link>
      <div className="flex items-center space-x-4">
        {user?.token ? (
          <Link
            href="/account"
            className="active:bg-neutral-300 dark:active:bg-neutral-700"
          >
            Manage Account
          </Link>
        ) : (
          <Link href="/auth/login">
            <Button type="button" className="py-1 px-3">
              Sign In
            </Button>
          </Link>
        )}
        <Button
          onClick={() => toggleDrawer(true)}
          variant="outline"
          size="icon"
        >
          <HamburgerMenuIcon />
        </Button>
      </div>
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      >
        <div className="container border overflow-scroll p-4 bg-background text-foreground h-full w-[70vw]">
          <Button
            onClick={() => toggleDrawer(false)}
            variant="outline"
            size="icon"
            className="border-none relative"
          >
            <PanelRightClose />
          </Button>
          <Accordion type="single" collapsible className="my-8">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline">
                Welcome{user && `, ${user.first_name}`}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-3 p-4">
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Thrift Commerce
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Shop new handpicked deals in categories such as
                      electronics, computers & tablets, fashion & fashion
                      accessories etc.
                    </p>
                  </Link>
                  <Link
                    href="/deals/new-arrivals"
                    title="New Arrivals"
                    className="active:bg-neutral-300 dark:active:bg-neutral-700"
                  >
                    New Arrivals for fashion and fashion accessories.
                  </Link>
                  <Link
                    href="/deals/electronics"
                    title="Deals on Electronics"
                    className="active:bg-neutral-300 dark:active:bg-neutral-700"
                  >
                    Hot new deals on electronic items such as TVs, mobile phones
                    and household electronics
                  </Link>
                  <Link
                    href="/deals/computers"
                    title="Computer Deals"
                    className="active:bg-neutral-300 dark:active:bg-neutral-700"
                  >
                    Hot new deals on computers and computer accessories.
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="hover:no-underline">
                Browse Categories
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col space-y-3 p-4">
                  {components.map((component) => (
                    <Link
                      key={component.title}
                      title={component.title}
                      href={component.href}
                      className="active:bg-neutral-300 dark:active:bg-neutral-700"
                    >
                      {component.description}
                    </Link>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <ModeToggle />
          </Accordion>
        </div>
      </SwipeableDrawer>
    </div>
  )
}
