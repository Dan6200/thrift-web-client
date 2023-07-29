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

  const contactType = watch('email', ContactType.Email)

  const handleContactTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('email', '')
  }

  const onSubmit = async (data: LoginFormState) => {
    console.log('formState', data)
    let response: AxiosResponse<any, any> | null = null
    try {
      response = await axios.post(server, data)
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
            name="contactType"
            className={styling + ' mr-2'}
            value={ContactType.Email}
            checked={contactType === ContactType.Email}
            onChange={handleContactTypeChange}
          />
          Email
        </Label>
        <Label>
          <RadioInput
            name="contactType"
            className={styling + ' mr-2'}
            value={ContactType.Phone}
            checked={contactType === ContactType.Phone}
            onChange={handleContactTypeChange}
          />
          Phone Number
        </Label>
      </div>
      <Label>
        {contactType === ContactType.Email ? 'Email' : 'Phone Number'}
      </Label>
      <ContactField
        type={contactType === ContactType.Email ? 'email' : 'tel'}
        className={styling}
        {...register(contactType)}
      />

      <Label>Password</Label>
      <PasswordField className={styling} {...register(contactType)} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
