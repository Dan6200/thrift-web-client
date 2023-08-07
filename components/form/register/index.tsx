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
import useFormProps from './use-form-props'
import { useEffect } from 'react'
import { userTokenAtom } from '@/atoms/index'
import { useSetAtom } from 'jotai'
import Link from 'next/link'

export function RegisterForm() {
  const setUserToken = useSetAtom(userTokenAtom)
  const form = useForm<RegisterFormState>(useFormProps)
  const { handleSubmit } = form
  const submit: SubmitHandler<RegisterFormState> = submitHandler.bind(
    null,
    setUserToken
  )
  const { setError } = form
  const {
    formState: { errors },
  } = form
  // forward the form object error to email and phone
  const fieldLessError = errors['']
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
        <Button className="mt-4 mb-8" type="submit">
          Submit
        </Button>
        <p className="text-center">
          Already have an account?{' '}
          <Link href="/auth/login" className="dark:text-blue-200 text-blue-700">
            Sign in
          </Link>
        </p>
      </form>
    </Form>
  )
}
