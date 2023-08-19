export interface RegisterFormState {
  first_name: string
  last_name: string
  email: string | null
  phone: string | null
  password: string
  confirm_password: string
  dob: Date
  ['']: string
}

export interface ResponseData {
  message?: string
  token?: string
}
