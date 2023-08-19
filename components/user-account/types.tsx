export interface UserAccount {
  token: string
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  password?: Buffer | string
  new_password?: Buffer | string
  dob?: Date
  country?: string
}
