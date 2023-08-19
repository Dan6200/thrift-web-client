import { InputProps } from '@/components/ui/input'
import { Noop, RefCallBack } from 'react-hook-form'

export interface LoginFormState {
  email: string | null
  phone: string | null
  password: string
  ['']: string
}

export interface LoginInputProps extends InputProps {
  onChange: (...event: any[]) => {}
  onInput: (...event: any[]) => {}
  onBlur: Noop
  value: string | undefined
  name: 'email' | 'phone' | 'password'
  ref: RefCallBack
  placeholder?: '08012345678' | 'myemail@mail.com'
  type: 'email' | 'phone' | 'password'
}

export interface ResponseData {
  token: string
}
