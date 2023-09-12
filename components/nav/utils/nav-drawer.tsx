// cspell:ignore SwipeableDrawer
import { SwipeableDrawer } from '@mui/material'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Menu, Search, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { PanelRightClose, UserCircle2 } from 'lucide-react'
import { components } from './nav-components'
import { ModeToggle } from '@/components/dark-mode-toggle'
import { logout } from './logout'
import { useAtomValue, useSetAtom } from 'jotai'
import { UserAccount } from '@/components/user-account/types'
import { getTotalCountAtom } from '@/atoms'
import SearchComp from '@/components/search'
import { cn } from '@/lib/utils'

type SetUser = ReturnType<typeof useSetAtom<UserAccount | null, any[], any>>

export const NavDrawer = ({
  user,
  setUser,
}: {
  user: UserAccount | null
  setUser: SetUser
}) => {
  const [isOpen, toggleDrawer] = useState(false)
  const [showSearchBox, setShowSearchBox] = useState(false)
  const totalItems = useAtomValue(getTotalCountAtom)
  const searchRef = useRef<null | HTMLDivElement>(null)
  const toggleSearchButton = useRef<null | HTMLButtonElement>(null)
  useEffect(() => {
    document.addEventListener('click', hide)
    return () => document.addEventListener('click', hide)
  }, [])
  const hide = (e: Event) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(e.target as any) &&
      !searchRef.current.contains(toggleSearchButton.current) &&
      !toggleSearchButton.current?.contains(e.target as any)
    ) {
      setShowSearchBox(false)
      console.log('runs')
      console.log(searchRef.current.contains(e.target as any))
      console.log()
    }
  }
  return (
    <>
      <div className="max-w-none border-b flex flex-row items-center justify-between w-full px-4 py-4 bg-background shadow-md dark:shadow-none">
        <Link
          href="/"
          className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold"
        >
          Thrift
        </Link>
        <div className="flex items-center space-x-4">
          <Button
            variant={'outline'}
            className=""
            size="icon"
            onClick={() => setShowSearchBox(true)}
            ref={toggleSearchButton}
          >
            <Search />
          </Button>
          <Link href="/shopping-cart" className="block relative h-12 w-12 p-0">
            {!!totalItems && (
              <span className="bg-primary text-primary-foreground w-6 text-center block absolute right-0 top-0 text-sm rounded-full">
                {totalItems}
              </span>
            )}
            <Button variant="outline" size="icon" className="my-2 p-0 w-10">
              <ShoppingCart className="w-5" />
            </Button>
          </Link>
          {user?.token ? (
            <Link
              href="/account"
              className="active:bg-neutral-300 dark:active:bg-neutral-700"
            >
              <UserCircle2 />
            </Link>
          ) : (
            <Link href="/auth/login">
              <Button type="button" className="py-1 px-3 text-md h-8">
                Sign In
              </Button>
            </Link>
          )}
          <Button
            onClick={() => toggleDrawer(true)}
            variant="outline"
            size="icon"
          >
            <Menu />
          </Button>
        </div>
        <SwipeableDrawer
          anchor="right"
          open={isOpen}
          onClose={() => toggleDrawer(false)}
          onOpen={() => toggleDrawer(true)}
        >
          <div className="container border overflow-scroll p-4 bg-background text-foreground h-full w-[70vw] sm:w-[50vw]">
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
                  Welcome{user?.token && `, ${user.first_name}`}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-3 p-4">
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/80 to-secondary/90 text-primary-foreground dark:from-primary/40 dark:to-secondary/50 p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Thrift Commerce
                      </div>
                      <p className="text-sm leading-tight text-primary-foreground dark:text-primary-foreground/80">
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
                      Hot new deals on electronic items such as TVs, mobile
                      phones and household electronics
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
            {user && (
              <Button
                className="w-full text-destructive text-md"
                onClick={user ? logout.bind(null, user, setUser) : undefined}
              >
                Sign out
              </Button>
            )}
          </div>
        </SwipeableDrawer>
      </div>
      <div
        style={{
          filter: 'blur(-4px)',
        }}
        className={cn(showSearchBox ? 'block' : 'hidden')}
        ref={searchRef}
      >
        <SearchComp />
      </div>
      <div className="w-full h-[100vh] blur-sm absolute top-0 left-0 z-10 block"></div>
    </>
  )
}
