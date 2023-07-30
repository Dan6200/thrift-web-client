'use client'
import axios, { AxiosResponse } from 'axios'
import { Button } from '../../ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { formSchema } from './validation'
import { LoginFormState } from './types'
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input, InputProps } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const server = 'https://thrift-dev.onrender.com/v1/auth/login'

export function LoginForm() {
  const form = useForm<LoginFormState>({
    resolver: async (data, context, options) => {
      // debug input schema
      console.log('formData', data)
      console.log(
        'validation result',
        await joiResolver(formSchema)(data, context, options)
      )
      return joiResolver(formSchema)(data, context, options)
    },
  })
  const { handleSubmit } = form

  const submit: SubmitHandler<LoginFormState> = async (
    data: LoginFormState,
    e
  ) => {
    e?.preventDefault()
    console.log('runs')
    const formData = data
    console.log('Data', formData)
    let response: AxiosResponse<'token', string> | null = null
    try {
      response = await axios.post(server, formData)
    } catch (err) {
      throw err
    }
    alert('Login successful!')
    console.log(response?.data)
  }

  return (
    <Form {...form}>
      <form
        className="w-full flex flex-col p-4 sm:p-8 m-auto"
        onSubmit={handleSubmit(submit)}
      >
        <Tabs defaultValue="email" className="">
          <TabsList className="h-fit grid grid-cols-2 mb-8">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone Number</TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="myemailaddress1234@mail.com"
                      {...(field as InputProps)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="phone">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="08012345678"
                      {...(field as InputProps)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...(field as InputProps)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}
