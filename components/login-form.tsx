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

interface LoginFormState {
  email: string | null
  phone: string | null
  password: string
}

const server = 'https://thrift-dev.up.railway.app/v1/auth/login'
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
    <Form className="flex flex-col m-auto w-80" onSubmit={handleSubmit}>
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
        type={contactValues.contactType === ContactType.Email ? 'email' : 'tel'}
        className={styling}
        pattern={
          contactValues.contactType === ContactType.Email
            ? '^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$'
            : '^s*(?:+?(d{1,3}))?[-. (]*(d{3})[-. )]*(d{3})[-. ]*(d{4})(?: *x(d+))?s*$'
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
      <Button
        type="submit"
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Submit
      </Button>
    </Form>
  )
}
