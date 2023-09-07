// cspell:ignore womens
'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { ModeToggle } from '../../dark-mode-toggle'
import { Button } from '../../ui/button'
import { useAtomValue, useSetAtom } from 'jotai'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { ListItem } from '../utils/list-item'
import { components } from '../utils/nav-components'
import { ShoppingCart, UserCircle2 } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { logout } from './logout'
import { UserAccount } from '@/components/user-account/types'
import { getTotalCountAtom } from '@/atoms'
import { ShoppingCartDrawer } from '@/components/shopping-cart/drawer'
import Search from '@/components/search'

type SetUser = ReturnType<typeof useSetAtom<UserAccount | null, any[], any>>

export function NavMenu({
  user,
  setUser,
}: {
  user: UserAccount | null
  setUser: SetUser
}) {
  const totalItems = useAtomValue(getTotalCountAtom)
  const [isOpen, toggleDrawer] = useState(false)
  return (
    <NavigationMenu className="max-w-none border-b flex flex-row items-center justify-between w-full px-4 py-2  shadow-md dark:bg-background  dark:shadow-none">
      <div className="justify-start flex">
        <Link
          href="/"
          className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-2xl font-bold"
        >
          Thrift
        </Link>
        <NavigationMenuList className="ml-16">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Welcome</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/80 to-secondary text-primary-foreground dark:from-primary/40 dark:to-secondary/50 p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-bold">
                        Thrift Commerce
                      </div>
                      <p className="text-sm leading-tight text-primary-foreground dark:text-primary-foreground/80">
                        Shop new handpicked deals in categories such as
                        electronics, computers & tablets, fashion & fashion
                        accessories etc.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/deals/new-arrivals" title="New Arrivals">
                  New Arrivals for fashion and fashion accessories.
                </ListItem>
                <ListItem
                  href="/deals/electronics"
                  title="Deals on Electronics"
                >
                  Hot new deals on electronic items such as TVs, mobile phones
                  and household electronics
                </ListItem>
                <ListItem href="/deals/computers" title="Computer Deals">
                  Hot new deals on computers and computer accessories.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Browse Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
      {/* <Search /> */}
      <div className="flex justify-between items-center w-48">
        <div className="relative h-12 w-12 p-0">
          {!!totalItems && (
            <span className="bg-primary text-primary-foreground w-6 text-center block absolute right-0 top-0 text-sm rounded-full">
              {totalItems}
            </span>
          )}
          <Button
            variant="outline"
            className="my-2 p-0 w-10"
            onClick={() => {
              toggleDrawer(true)
            }}
          >
            <ShoppingCart className="w-5" />
          </Button>
        </div>
        {user?.token ? (
          <Link href="/account" legacyBehavior passHref>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="border-none">
                  Hello
                  {user && user.token && user.first_name && (
                    <span className="w-20 flex items-center justify-between">
                      , {user.first_name}
                      <UserCircle2 />
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Button
                  className="w-full text-destructive text-md"
                  onClick={user ? logout.bind(null, user, setUser) : undefined}
                >
                  Sign out
                </Button>
              </PopoverContent>
            </Popover>
          </Link>
        ) : (
          <Link href="/auth/login">
            <Button type="button" className="text-md py-1 px-3">
              Sign In
            </Button>
          </Link>
        )}
        <ModeToggle />
      </div>
      <ShoppingCartDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
    </NavigationMenu>
  )
}
