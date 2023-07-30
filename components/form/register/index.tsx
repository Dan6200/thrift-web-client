'use client'
// cspell:ignore hookform lucide
import { Button } from '@/components/ui/button'
import axios, { AxiosResponse } from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form } from '../../ui/form'
import { joiResolver } from '@hookform/resolvers/joi'
import {
  ConfirmPassword,
  Country,
  DOB,
  FirstName,
  LastName,
  Password,
} from '../utils/form-fields'
import { RegisterFormState } from '../register'

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

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-full m-auto"
        onSubmit={handleSubmit(submit)}
      >
        <FirstName form={form} />
        <LastName form={form} />
        <Password form={form} />
        <ConfirmPassword form={form} />
        <DOB form={form} />
        <Country form={form} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
