'use client'
import { Button } from '@/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form } from '../../ui/form'
import {
  ConfirmPassword,
  Country,
  DOB,
  Email,
  FirstName,
  LastName,
  Password,
  Phone,
} from '../register/form-fields'
import { RegisterFormState } from './types'
import submitHandler from './submit-handler'
import useFromProps from './use-from-props'

export function RegisterForm() {
  const form = useForm<RegisterFormState>(useFromProps)
  const { handleSubmit } = form
  const submit: SubmitHandler<RegisterFormState> = submitHandler

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
