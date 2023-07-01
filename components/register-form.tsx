'use client'
import { useState } from 'react'
import { Form } from './form'
import { Button } from './form/button'
import { DateField } from './form/date-field'
import { EmailField } from './form/email-field'
import { Label } from './form/labels'
import { NameField } from './form/name-field'
import { PasswordField } from './form/password-field'
import { PhoneField } from './form/phone-field'
import axios, { AxiosResponse } from 'axios'

interface RegisterFormState {
  first_name: string
  last_name: string
  email: string
  phone: string
  password: string
  confirm_password?: string
  dob: string
  country: string
}

const server = 'https://thrift-dev.up.railway.app/v1/auth/register'
export function RegisterForm() {
  const [formState, setFormState] = useState<RegisterFormState>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    dob: '',
    country: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState({
      ...formState,
      [name.replace('-', '_') as keyof RegisterFormState]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('formState', formState)
    if (formState.password !== formState.confirm_password) {
      throw new Error('Passwords do not match')
    }
    const { confirm_password, ...userData } = formState
    let response: AxiosResponse<any, any> | null = null
    try {
      response = await axios.post(server, userData)
    } catch (err) {
      throw err
    }
    alert('User created successfully')
    console.log(response?.data)
  }

  const styling = 'p-2 my-4 rounded-sm dark:bg-gray-800'

  return (
    <Form className="flex flex-col m-auto w-80" onSubmit={handleSubmit}>
      <Label>First Name</Label>
      <NameField
        name="first-name"
        className={styling}
        value={formState.first_name}
        onChange={handleInputChange}
      />
      <Label>Last Name</Label>
      <NameField
        name="last-name"
        className={styling}
        value={formState.last_name}
        onChange={handleInputChange}
      />
      <Label>Email Address</Label>
      <EmailField
        name="email"
        className={styling}
        value={formState.email}
        onChange={handleInputChange}
      />
      <Label>...Or, Phone Number</Label>
      <PhoneField
        name="phone"
        className={styling}
        value={formState.phone}
        onChange={handleInputChange}
      />

      <Label>Password</Label>
      <PasswordField
        name="password"
        className={styling}
        value={formState.password}
        onChange={handleInputChange}
      />
      <Label>Confirm Password</Label>
      <PasswordField
        name="confirm-password"
        className={styling}
        value={formState.confirm_password}
        onChange={handleInputChange}
      />
      <Label>Date of Birth</Label>
      <DateField
        name="dob"
        className={styling}
        value={formState.dob}
        onChange={handleInputChange}
      />
      <Label>Country</Label>
      <NameField
        name="country"
        className={styling}
        value={formState.country}
        onChange={handleInputChange}
      />
      <Button
        type="submit"
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Submit
      </Button>
    </Form>
  )
}
