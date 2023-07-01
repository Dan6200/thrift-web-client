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

export function RegisterForm() {
  const [formState, setFormState] = useState({
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
      [name.replace('-', '_')]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formState)
  }

  return (
    <Form className="flex flex-col m-auto w-80" onSubmit={handleSubmit}>
      <Label>First Name</Label>
      <NameField
        name="first-name"
        className="py-1 my-4 rounded-sm dark:bg-gray-800"
        value={formState.first_name}
        onChange={handleInputChange}
      />
      <Label>Last Name</Label>
      <NameField
        name="last-name"
        className="py-1 my-4 rounded-sm dark:bg-gray-800"
        value={formState.last_name}
        onChange={handleInputChange}
      />
      <Label>Email Address</Label>
      <EmailField
        name="email"
        className="py-1 my-4 rounded-sm dark:bg-gray-800"
        value={formState.email}
        onChange={handleInputChange}
      />
      <Label>...Or, Phone Number</Label>
      <PhoneField
        name="phone"
        className="py-1 my-4 rounded-sm dark:bg-gray-800"
        value={formState.phone}
        onChange={handleInputChange}
      />

      <Label>Password</Label>
      <PasswordField
        name="password"
        className="py-1 my-4 rounded-sm dark:bg-gray-800"
        value={formState.password}
        onChange={handleInputChange}
      />
      <Label>Confirm Password</Label>
      <PasswordField
        name="confirm-password"
        className="py-1 my-4 rounded-sm dark:bg-gray-800"
        value={formState.confirm_password}
        onChange={handleInputChange}
      />
      <Label>Date of Birth</Label>
      <DateField
        name="dob"
        className="py-1 my-4 rounded-sm dark:bg-gray-800"
        value={formState.dob}
        onChange={handleInputChange}
      />
      <Label>Country</Label>
      <NameField
        name="country"
        className="py-1 my-4 rounded-sm dark:bg-gray-800"
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
