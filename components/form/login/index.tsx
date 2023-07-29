'use client'
import axios, { AxiosResponse } from 'axios'
import { Button } from '../../ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { formSchema } from './validation'
import { ContactType, ContactValues, LoginFormState } from './types'
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

const server = 'https://thrift-dev.onrender.com/v1/auth/login'

export function LoginForm() {
  const form = useForm<LoginFormState & ContactValues>({
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
  const { handleSubmit, watch } = form
  const contactType = watch('contactType', ContactType.Email)

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
        className="flex flex-col w-full sm:w-[28rem] p-4 sm:p-8 m-auto"
        onSubmit={handleSubmit(submit)}
      >
        <Tabs defaultValue="email" className="w-[24rem]">
          <TabsList className="h-fit grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone Number</TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <FormField
              control={form.control}
              name={contactType}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="myemailaddress1234@mail.com"
                      type="email"
                      {...field}
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
              name={contactType}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+234-123-456-7890"
                      type="phone"
                      {...field}
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
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*
        <label>Preferred Login Method:</label>
        <div className="flex flex-row justify-between w-[80%]">
          <label>
            <RadioInput
              name="contactType"
              className={styling + ' mr-2'}
              value={ContactType.Email}
              checked={contactType === ContactType.Email}
              onChange={handleContactTypeChange}
            />
            Email
          </label>
          <label>
            <RadioInput
              name="contactType"
              className={styling + ' mr-2'}
              value={ContactType.Phone}
              checked={contactType === ContactType.Phone}
              onChange={handleContactTypeChange}
            />
            Phone
          </label>
        </div>
        <label className={labelStyle}>
          {contactType === ContactType.Email ? 'Email' : 'Phone'}
          <ContactField
            type={contactType === ContactType.Email ? 'email' : 'tel'}
            className={styling}
            {...register(contactType)}
          />
        </label>

        <label className={labelStyle}>
          Password
          <PasswordField
            type="password"
            className={styling}
            {...register('password')}
          />
				</label>*/}
        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}
