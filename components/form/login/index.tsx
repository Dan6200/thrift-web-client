'use client'
import { useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Button } from '../../ui/button'
import { ContactField } from './../utils/contact-field'
import { PasswordField } from './../utils/password-field'
import { RadioInput } from './../utils/radio-input'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Link from 'next/link'
import { formSchema } from './validation'
import { ContactType, ContactValues, LoginFormState } from './types'
import { Form } from '@/components/ui/form'

const server = 'https://thrift-dev.onrender.com/v1/auth/login'

export function LoginForm() {
  const { register, handleSubmit, watch, setValue } = useForm<LoginFormState>({
    resolver: joiResolver(formSchema),
  })

  const emailType = watch('email', ContactType.Email)
  const phoneType = watch('phone', ContactType.Phone)
  console.log(emailType, phoneType)

  if (emailType === null) throw new Error('Error handling form input')
  if (emailType !== 'email') throw new Error('Error setting the email field')
  if (phoneType !== 'phone') throw new Error('Error setting the phone field')

  const handleContactTypeChange = (_: React.ChangeEvent<HTMLInputElement>) => {
    setValue('email', '')
    setValue('phone', '')
  }

  const onSubmit = async (formState: LoginFormState) => {
    console.log('formState', formState)
    let response: AxiosResponse<any, any> | null = null
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
      className="flex flex-col w-full m-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Label>Preferred Login Method</Label>
      <div className="flex flex-row justify-between w-full">
        <Label>
          <RadioInput
            name="emailType"
            className={styling + ' mr-2'}
            value={ContactType.Email}
            checked={emailType === ContactType.Email}
            onChange={handleContactTypeChange}
          />
          Email
        </Label>
        <Label>
          <RadioInput
            name="emailType"
            className={styling + ' mr-2'}
            value={ContactType.Phone}
            checked={phoneType === ContactType.Phone}
            onChange={handleContactTypeChange}
          />
          Phone Number
        </Label>
      </div>
      <Label>
        {emailType === ContactType.Email ? 'Email' : 'Phone Number'}
      </Label>
      <ContactField
        type={emailType === ContactType.Email ? 'email' : 'tel'}
        className={styling}
        {...register(emailType!)}
      />

      <Label>Password</Label>
      <PasswordField className={styling} {...register(emailType)} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
