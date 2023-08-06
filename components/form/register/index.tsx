'use client'
import { Button } from '@/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form } from '../../ui/form'
import {
  ConfirmPassword,
  DOB,
  Email,
  FirstName,
  LastName,
  Password,
  Phone,
} from '../register/form-fields'
import { RegisterFormState } from './types'
import submitHandler from './submit-handler'
import useFromProps from './use-form-props'
import { useEffect } from 'react'

export function RegisterForm() {
  const form = useForm<RegisterFormState>(useFromProps)
  const { handleSubmit } = form
  const submit: SubmitHandler<RegisterFormState> = submitHandler
  const { setError } = form
  const {
    formState: { errors },
  } = form
  // forward the form object error to email and phone
  const fieldLessError = errors['']
  console.log(fieldLessError)
  console.log(errors)
  useEffect(() => {
    if (fieldLessError?.message) {
      setError('email', {
        type: fieldLessError?.type,
        message: fieldLessError?.message,
      })
      setError('phone', {
        type: fieldLessError?.type,
        message: fieldLessError?.message,
      })
    }
  }, [fieldLessError])

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-full m-auto"
        onSubmit={handleSubmit(submit)}
      >
        <FirstName form={form} />
        <LastName form={form} />
        <Email form={form} />
        <Phone form={form} />
        <Password form={form} />
        <ConfirmPassword form={form} />
        <DOB form={form} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
