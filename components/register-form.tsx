'use client'
import { useState } from 'react'
import { Form } from './form'
import { Button } from './form/button'
import { DateField } from './form/date-field'
import { Label } from './form/labels'
import { NameField } from './form/name-field'
import { PasswordField } from './form/password-field'
import axios, { AxiosResponse } from 'axios'
import { ContactField } from './form/contact-field'
import { RadioInput } from './form/radio-input'

enum ContactType {
  Email = 'email',
  Phone = 'phone',
}

interface ContactValues {
  contactType: ContactType
  contactValue: string
}

interface RegisterFormState {
  first_name: string
  last_name: string
  email: string | null
  phone: string | null
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

  const [contactValues, setContactValues] = useState<ContactValues>({
    contactType: ContactType.Email,
    contactValue: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState({
      ...formState,
      [name.replace('-', '_') as keyof RegisterFormState]: value,
    })
  }

  const handleContactTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setContactValues({
      ...contactValues,
      contactType: value as ContactType,
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

  const styling = 'p-2 my-4 rounded-md dark:bg-gray-800'

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
      <Label>Preferred Contact Method</Label>
      <span className="flex flex-row items-end w-full">
        <Label>
          <RadioInput
            name="contactType"
            className={styling + ' mr-2'}
            value={ContactType.Email}
            checked={contactValues.contactType === ContactType.Email}
            onChange={handleContactTypeChange}
          />
          Email Address
        </Label>
        <Label>
          <RadioInput
            name="contactType"
            className={styling + ' mr-2 ml-4'}
            value={ContactType.Phone}
            checked={contactValues.contactType === ContactType.Phone}
            onChange={handleContactTypeChange}
          />
          Phone Number
        </Label>
      </span>
      <Label>
        {contactValues.contactType === ContactType.Email
          ? 'Email'
          : 'Phone Number'}
      </Label>
      <ContactField
        name="contact"
        type={contactValues.contactType === ContactType.Email ? 'email' : 'tel'}
        className={styling}
        value={contactValues.contactValue}
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
