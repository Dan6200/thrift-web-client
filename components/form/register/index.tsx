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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

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
      {rootError?.message && (
        <Dialog defaultOpen={!!rootError?.message}>
          <DialogContent className="overflow-hidden w-[90vw] md:w-full rounded-md">
            <DialogHeader>
              <DialogTitle className="font-semibold italic text-destructive mt-4">
                There was an error while creating account...
              </DialogTitle>
              <DialogDescription className="pt-4 capitalize text-md font-bold ">
                {rootError?.message}
              </DialogDescription>
            </DialogHeader>
            {rootError?.message.includes('exists') && (
              <DialogFooter className="font-normal flex-row mb-4 justify-center text-neutral-700 italic">
                <p>
                  Did you mean to &nbsp;
                  <Link
                    href="/auth/login"
                    className="dark:text-blue-200 text-blue-700"
                  >
                    Sign in
                  </Link>
                  &nbsp; instead?
                </p>
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      )}
    </Fragment>
  )
}
