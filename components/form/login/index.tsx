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
import { Password, TabbedContactField } from './form-fields'

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
        <TabbedContactField form={form} />
        <Password form={form} />
        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}
