'use client'
import {Input, InputProps} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import axios, {AxiosResponse} from 'axios'
import {SubmitHandler, useForm} from 'react-hook-form'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form'
import {joiResolver} from '@hookform/resolvers/joi'

interface RegisterFormState {
  first_name: string
  last_name: string
  email: string | null
  phone: string | null
  password: string
  confirm_password?: string
  dob: string
  country: string
}

const server = 'https://thrift-dev.onrender.com/v1/auth/register'
export function RegisterForm() {
  const form = useForm<RegisterFormState>({
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

  const submit: SubmitHandler<RegisterFormState> = async (
    data: RegisterFormState,
    e
  ) => {
    e?.preventDefault()
		const formState = data
    if (formState.password !== formState.confirm_password) {
      throw new Error('Passwords do not match')
    }
    const { confirm_password, ...userData } = formState
    console.log('formState', formState)
    console.log('userData', userData)
    let response: AxiosResponse<any, any> | null = null
    try {
      response = await axios.post(server, userData)
    } catch (err) {
      throw err
    }
    alert('User created successfully')
    console.log(response?.data)
  }

  const styling = 'p-2 my-4 rounded-md dark:bg-gray-800'

  return (
		<Form {...form}>
    <form className="flex flex-col w-full m-auto" onSubmit={handleSubmit(submit)}>
            <FormField
              control={form.control}
        name="first-name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First"
                      {...(field as InputProps)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
        name="last-name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Last"
                      {...(field as InputProps)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
        name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose a Secure Password</FormLabel>
                  <FormControl>
                    <Input
                      {...(field as InputProps)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
        name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose a Secure Password</FormLabel>
                  <FormControl>
                    <Input
                      {...(field as InputProps)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

      <Label>Date of Birth</Label>
      <DateField
        name="dob"
        className={styling}
        value={formState.dob}
        onChange={handleInputChange}
      />

      <Label>Country</Label>
      <NameField
        name="country"
        className={styling}
        value={formState.country}
        onChange={handleInputChange}
      />
      <Button type="submit">Submit</Button>
    </Form>
  )
}
/*
        pattern={
          contactValues.contactType === ContactType.Email
            ? '^((\[^<>()\[\]\\.,;:s@"\]+(.\[^<>()\[\]\\.,;:s@"\]+)*)|(".+"))@((\[\[0-9\]{1,3}.\[0-9\]{1,3}.\[0-9\]{1,3}.\[0-9\]{1,3}\])|((\[a-zA-Z-0-9\]+.)+\[a-zA-Z\]{2,}))$'
            : '^s*(?:+?(d{1,3}))?\[-. (\]*(d{3})\[-. )\]*(d{3})\[-. \]*(d{4})(?: *x(d+))?s*$'
				}*/
