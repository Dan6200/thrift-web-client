'use client'
import { LoginFormState, LoginInputProps } from './types'
import {
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RegisterOptions, UseFormReturn } from 'react-hook-form'
import { useEffect, useRef } from 'react'

export const TabbedContactField = ({
  form,
}: {
  form: UseFormReturn<LoginFormState, any, undefined>
}) => (
  <>
    <Tabs defaultValue="email" className="">
      <TabsList className="h-fit grid grid-cols-2 mb-8">
        <TabsTrigger value="email">Email</TabsTrigger>
        <TabsTrigger value="phone">Phone Number</TabsTrigger>
      </TabsList>
      <TabsContent value="email">
        <Email form={form} />
      </TabsContent>
      <TabsContent value="phone">
        <Phone form={form} />
      </TabsContent>
    </Tabs>
  </>
)

export const Password = ({
  form,
}: {
  form: UseFormReturn<LoginFormState, any, undefined>
}) => {
  const passwdRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    if (passwdRef !== null) {
      const passwdEl = passwdRef.current
      passwdEl?.addEventListener('change', handleChange)
      passwdEl?.dispatchEvent(new Event('change', { bubbles: true }))
      console.log(passwdEl)
      return () => passwdEl?.removeEventListener('change', handleChange)
    }
  }, [])
  const handleChange = (e: Event) => {
    console.log('runs')
    console.log((e.target as HTMLInputElement).value)
  }
  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input
              {...(field as LoginInputProps)}
              type="password"
              autoComplete="current-password"
              {...form.register('password', {
                onInput: (ev: Event) =>
                  form.setValue(
                    'password',
                    (ev.target as HTMLInputElement).value
                  ),
              } as RegisterOptions<LoginFormState, 'password'>)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export const Email = ({
  form,
}: {
  form: UseFormReturn<LoginFormState, any, undefined>
}) => (
  <FormField
    control={form.control}
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input
            placeholder="myemail@mail.com"
            {...(field as LoginInputProps)}
            {...form.register('password', {
              onInput: (ev: Event) =>
                form.setValue(
                  'password',
                  (ev.target as HTMLInputElement).value
                ),
            } as RegisterOptions<LoginFormState, 'password'>)}
            autoComplete="email"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export const Phone = ({
  form,
}: {
  form: UseFormReturn<LoginFormState, any, undefined>
}) => (
  <FormField
    control={form.control}
    name="phone"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Phone</FormLabel>
        <FormControl>
          <Input
            placeholder="08012345678"
            {...(field as LoginInputProps)}
            {...form.register('password', {
              onInput: (ev: Event) =>
                form.setValue(
                  'password',
                  (ev.target as HTMLInputElement).value
                ),
            } as RegisterOptions<LoginFormState, 'password'>)}
            autoComplete="tel"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)
