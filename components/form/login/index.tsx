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
import { userAtom } from '@/atoms'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'

export function LoginForm() {
  const form = useForm<LoginFormState>(useFormProps)
  const router = useRouter()
  const setUser = useSetAtom(userAtom)
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
  }, [setError, fieldLessError])

  const submit: SubmitHandler<LoginFormState> = submitHandler.bind(
    null,
    setUser,
    setError,
    router
  )
  const rootError = errors['root']

  return (
    <>
      <Form {...form}>
        <form
          className="w-full flex flex-col p-4 sm:p-8 m-auto"
          onSubmit={handleSubmit(submit)}
        >
          <TabbedContactField form={form} />
          <Password form={form} />
          <Button className="mt-4 mb-8" type="submit">
            Submit
          </Button>
          <p className="text-center">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/register"
              className="dark:text-blue-200 text-blue-700"
            >
              Sign up
            </Link>
          </p>
        </form>
      </Form>
      {rootError?.message && (
        <Dialog defaultOpen={!!rootError?.message}>
          <DialogContent className="overflow-hidden w-[90vw] md:w-full rounded-md">
            <DialogHeader>
              <DialogTitle className="font-semibold italic text-destructive mt-4">
                There was an error while signing in...
              </DialogTitle>
              <DialogDescription className="pt-4 capitalize text-md font-bold ">
                {rootError?.message}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
