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
import { userTokenAtom } from '@/atoms'
import { ModeToggle } from '@/components/dark-mode-toggle'

export const NavDrawer = () => {
  const [isOpen, toggleDrawer] = useState(false)
  const userToken = useAtomValue(userTokenAtom)
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
        <div className="container border p-4 bg-background text-foreground h-full w-[70vw]">
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
                Welcome
              </AccordionTrigger>
              <AccordionContent>
                <ul className="grid gap-3 p-4">
                  <li>
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
                  </li>
                  <Link
                    href="/deals/new-arrivals"
                    title="New Arrivals"
                    className="hover:underline"
                  >
                    New Arrivals for fashion and fashion accessories.
                  </Link>
                  <Link
                    href="/deals/electronics"
                    title="Deals on Electronics"
                    className="hover:underline"
                  >
                    Hot new deals on electronic items such as TVs, mobile phones
                    and household electronics
                  </Link>
                  <Link
                    href="/deals/computers"
                    title="Computer Deals"
                    className="hover:underline"
                  >
                    Hot new deals on computers and computer accessories.
                  </Link>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Browse Categories</AccordionTrigger>
              <AccordionContent>
                <ul className="grid gap-3 p-4">
                  {components.map((component) => (
                    <Link
                      key={component.title}
                      title={component.title}
                      href={component.href}
                      className="hover:underline"
                    >
                      {component.description}
                    </Link>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex space-x-4">
            {userToken ? (
              <Link href="/account" className="hover:underline">
                Manage Account
              </Link>
            ) : (
              <Link href="/auth/login">
                <Button type="button" className="py-1 px-3">
                  Sign In
                </Button>
              </Link>
            )}
            <ModeToggle />
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  )
}
