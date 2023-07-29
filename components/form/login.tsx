'use client'
import { useState } from 'react'
// import { Form } from './form'
import Joi from 'joi'
import axios, { AxiosResponse } from 'axios'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Button } from '../ui/button'
import { Form } from './utils'
import { ContactField } from './utils/contact-field'
import { PasswordField } from './utils/password-field'
import { RadioInput } from './utils/radio-input'

enum ContactType {
  Email = 'email',
  Phone = 'phone',
}

interface ContactValues {
  contactType: ContactType
  contactValue: string
}

interface LoginFormState {
  email: string | null
  phone: string | null
  password: string
}

const server = 'https://thrift-dev.onrender.com/v1/auth/login'
export function LoginForm() {
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    phone: '',
    password: '',
  })

  const [contactValues, setContactValues] = useState<ContactValues>({
    contactType: ContactType.Email,
    contactValue: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState({
      ...formState,
      [name.replace('-', '_') as keyof LoginFormState & ContactValues]: value,
    })
  }

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setContactValues({
      ...contactValues,
      contactValue: value,
    })
  }

  const handleContactTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setContactValues({
      ...contactValues,
      contactValue: '',
      contactType: value as ContactType,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (contactValues.contactType === ContactType.Email) {
      formState.email = contactValues.contactValue
      formState.phone = null
    } else {
      formState.phone = contactValues.contactValue
      formState.email = null
    }
    console.log('formState', formState)
    console.log('contactValues', contactValues)
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
    <Form>
      <form className="flex flex-col w-full m-auto" onSubmit={handleSubmit}>
        <Label>Preferred Login Method</Label>
        <div className="flex flex-row justify-between w-full">
          <Label>
            <RadioInput
              name="contactType"
              className={styling + ' mr-2'}
              value={ContactType.Email}
              checked={contactValues.contactType === ContactType.Email}
              onChange={handleContactTypeChange}
            />
            Email
          </Label>
          <Label>
            <RadioInput
              name="contactType"
              className={styling + ' mr-2'}
              value={ContactType.Phone}
              checked={contactValues.contactType === ContactType.Phone}
              onChange={handleContactTypeChange}
            />
            Phone Number
          </Label>
        </div>
        <Label>
          {contactValues.contactType === ContactType.Email
            ? 'Email'
            : 'Phone Number'}
        </Label>
        <ContactField
          name="contact"
          type={
            contactValues.contactType === ContactType.Email ? 'email' : 'tel'
          }
          className={styling}
          pattern={
            contactValues.contactType === ContactType.Phone
              ? '^s*(?:+?(d{1,3}))?[-. (]*(d{3})[-. )]*(d{3})[-. ]*(d{4})(?: *x(d+))?s*$'
              : '^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$'
          }
          value={contactValues.contactValue}
          onChange={handleContactInputChange}
        />

        <Label>Password</Label>
        <PasswordField
          name="password"
          className={styling}
          value={formState.password}
          onChange={handleInputChange}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}