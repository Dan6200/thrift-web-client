'use client'
import { useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Button } from '../../ui/button'
import { ContactField } from './../utils/contact-field'
import { PasswordField } from './../utils/password-field'
import { RadioInput } from './../utils/radio-input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Link from 'next/link'
import { formSchema } from './validation'
import { ContactType, ContactValues, LoginFormState } from './types'
import { Form } from '@/components/ui/form'

const server = 'https://thrift-dev.onrender.com/v1/auth/login'

/** TODO: use tabs instead of radio buttons **/
export function LoginForm() {
  const { register, handleSubmit, watch, setValue } = useForm<
    LoginFormState & ContactValues
  >({
    resolver: joiResolver(formSchema),
  })

  const contactType = watch('contactType', ContactType.Email)
  console.log('email', watch('email')) // why is this undefined
  console.log('phone', watch('phone')) // why is this undefined

  const handleContactTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('contactType', e.target.value as ContactType)
  }

  const onSubmit: SubmitHandler<LoginFormState> = async (
    data: LoginFormState
  ) => {
    const formState = data
    console.log('formState', formState)
    let response: AxiosResponse<'token', string> | null = null
    try {
      response = await axios.post(server, formState)
    } catch (err) {
      throw err
    }
    alert('Login successful!')
    console.log(response?.data)
  }

  const styling = 'p-2 my-4 rounded-md dark:bg-gray-800'

  return (
    <form
      className="flex flex-col w-full sm:w-[28rem] p-4 sm:p-8 m-auto border rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label>Preferred Login Method:</label>
      <div className="flex flex-row justify-between w-[80%]">
        <label>
          <RadioInput
            name="contactType"
            className={styling + ' mr-2'}
            value={ContactType.Email}
            checked={contactType === ContactType.Email}
            onChange={handleContactTypeChange}
          />
          Email
        </label>
        <label>
          <RadioInput
            name="contactType"
            className={styling + ' mr-2'}
            value={ContactType.Phone}
            checked={contactType === ContactType.Phone}
            onChange={handleContactTypeChange}
          />
          Phone
        </label>
      </div>
      <label>
        {contactType === ContactType.Email ? 'Email' : 'Phone'}
        <ContactField
          type={contactType === ContactType.Email ? 'email' : 'tel'}
          className={styling}
          {...register(contactType)}
        />
      </label>

      <label>
        Password
        <PasswordField
          type="password"
          className={styling}
          {...register('password')}
        />
      </label>
      <Button type="submit">Submit</Button>
    </form>
  )
}
