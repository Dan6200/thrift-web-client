import { Form } from './form'
import { EmailField } from './form/email-field'
import { Label } from './form/labels'
import { NameField } from './form/name-field'
import { PasswordField } from './form/password-field'
import { PhoneField } from './form/phone-field'

export function RegisterForm() {
  return (
    <Form className="flex flex-col m-auto w-80">
      <Label>First Name</Label>
      <NameField name="first-name" className="m-16 rounded-sm" />
      <Label>Last Name</Label>
      <NameField name="first-name" className="m-16 rounded-sm" />
      <Label>Email Address</Label>
      <EmailField name="email" className="m-16 rounded-sm" />
      <Label>...Or, Phone Number</Label>
      <PhoneField name="phone" className="m-16 rounded-sm" />
      <Label>Password</Label>
      <PasswordField name="password" className="m-16 rounded-sm" />
    </Form>
  )
}
