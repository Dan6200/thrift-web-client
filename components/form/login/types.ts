export enum ContactType {
  Email = 'email',
  Phone = 'phone',
}

export interface ContactValues {
  contactType: ContactType
}

export interface LoginFormState {
  email: string | null
  phone: string | null
  password: string
}
