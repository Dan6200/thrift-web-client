'use client'
import { Button } from '../../ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginFormState } from './types'
import { Form } from '@/components/ui/form'
import { Password, TabbedContactField } from './form-fields'
import { useEffect } from 'react'
import useFormProps from './use-form-props'
import submitHandler from './submit-handler'
import { useSetAtom } from 'jotai'
import { userTokenAtom } from '@/atoms'

export function LoginForm() {
  const form = useForm<LoginFormState>(useFormProps)
  const setUserToken = useSetAtom(userTokenAtom)
  const {
    formState: { errors },
    setError,
    handleSubmit,
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

  const submit: SubmitHandler<LoginFormState> = submitHandler.bind(
    null,
    setUserToken
  )

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
