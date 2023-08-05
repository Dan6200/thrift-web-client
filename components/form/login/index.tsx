'use client'
import axios, { AxiosResponse } from 'axios'
import { Button } from '../../ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginFormState } from './types'
import { Form } from '@/components/ui/form'
import { Password, TabbedContactField } from './form-fields'
import { useEffect } from 'react'
import useFormProps from './use-form-props'

const server = 'https://thrift-dev.onrender.com/v1/auth/login'

export function LoginForm() {
  const form = useForm<LoginFormState>(useFormProps)
  const {
    formState: { errors },
    setError,
    handleSubmit,
  } = form
  // forward the form object error to email and phone
  useEffect(() => {
    if (errors['']?.message) {
      setError('email', {
        type: errors?.['']?.type,
        message: errors?.['']?.message,
      })
    }
  }, [errors?.['']])

  const submit: SubmitHandler<LoginFormState> = async (
    data: LoginFormState,
    e
  ) => {
    e?.preventDefault()
    const formData = data
    let response: AxiosResponse<'token', string> | null = null
    try {
      response = await axios.post(server, formData)
    } catch (err) {
      throw err
    }
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
