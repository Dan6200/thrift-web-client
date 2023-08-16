// cspell:ignore womens
'use client'
import React from 'react'
import Link from 'next/link'
import { ModeToggle } from '../../dark-mode-toggle'
import { Button } from '../../ui/button'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/atoms'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { ListItem } from '../utils/list-item'
import { components } from '../utils/nav-components'
import { UserCircle2 } from 'lucide-react'

export function NavMenu() {
  const user = useAtomValue(userAtom)
  return (
    <NavigationMenu className="max-w-none flex flex-row items-center justify-between w-full px-4 py-4  border-b shadow-md dark:bg-background  dark:shadow-none">
      <div className="justify-start flex">
        <Link href="/" className="text-2xl font-bold">
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
      <div className="flex space-x-4">
        {user?.token ? (
          <Link href="/account" legacyBehavior passHref className="w-80">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Hello
              {user && user.token && user.first_name && (
                <div className="w-full">
                  , {user.first_name}
                  <UserCircle2 />
                </div>
              )}
            </NavigationMenuLink>
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
    </NavigationMenu>
  )
}
