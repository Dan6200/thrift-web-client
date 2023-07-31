'use client'
import axios, { AxiosResponse } from 'axios'
import { Button } from '../../ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { formSchema } from './schema'
import { LoginFormState, LoginInputProps } from './types'
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UseFormReturn } from 'react-hook-form'

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
}) => (
  <FormField
    control={form.control}
    name="password"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input {...(field as LoginInputProps)} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

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
            placeholder="myemailaddress1234@mail.com"
            {...(field as LoginInputProps)}
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
          <Input placeholder="08012345678" {...(field as LoginInputProps)} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)
