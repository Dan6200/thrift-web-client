'use client'
import React from 'react'
import Link from 'next/link'
import { ModeToggle } from '../dark-mode-toggle'
import { Button } from '../ui/button'
import { useAtomValue } from 'jotai'
import { userTokenAtom } from '@/atoms'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Computers & Tablets',
    href: '/categories/computers',
    description: 'Shop new laptop, desktop computers and tablets on Thrift.',
  },
  {
    title: 'Electronic Accessories',
    href: '/categories/electronic-accessories',
    description: 'Accessories such as headphones, chargers, USB cables etc.',
  },
  {
    title: 'Electronics',
    href: '/categories/electronics',
    description:
      'Household electronics such as TV, refrigerators, ovens and Consumer electronics such as phones, video games etc.',
  },
  {
    title: "Men's Fashion",
    href: '/categories/mens-fashion',
    description: "Shop men's wear, and fashion accessories here on Thrift.",
  },
  {
    title: "Women's Fashion",
    href: '/categories/womens-fashion',
    description:
      "Shop new women's wear, and women's fashion accessories here on Thrift.",
  },
]

export function NavMenu() {
  const userToken = useAtomValue(userTokenAtom)
  return (
    <NavigationMenu
      orientation="vertical"
      className="max-w-none flex flex-row items-center justify-between w-full px-4 py-4  border-b shadow-md dark:bg-background  dark:shadow-none"
    >
      <div className="justify-start flex">
        <Link href="/" className="text-2xl font-bold">
          Thrift Commerce
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
        {userToken ? (
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Manage Account
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

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})

ListItem.displayName = 'ListItem'
