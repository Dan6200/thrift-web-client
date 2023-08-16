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
import { Fragment, useEffect } from 'react'
import { userAtom } from '@/atoms/index'
import { useSetAtom } from 'jotai'
import Link from 'next/link'

export function RegisterForm() {
  const setUser = useSetAtom(userAtom)
  const form = useForm<RegisterFormState>(useFormProps)
  const { handleSubmit } = form
  const { setError } = form
  const submit: SubmitHandler<RegisterFormState> = submitHandler.bind(
    null,
    setUser,
    setError
  )
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
  }, [fieldLessError, setError])
  const rootError = errors['root']
  console.log(errors)

  return (
    <Fragment>
      {rootError?.message && (
        <p className="text-destructive font-bold my-8">
          Error: {rootError?.message}
        </p>
      )}
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
            <Link
              href="/auth/login"
              className="dark:text-blue-200 text-blue-700"
            >
              Sign in
            </Link>
          </p>
        </form>
      </Form>
    </Fragment>
  )
}
