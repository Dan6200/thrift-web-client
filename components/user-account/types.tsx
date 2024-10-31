export interface UserAccount {
  first_name: string
  last_name: string
  email: string | null
  phone: string | null
  dob: Date
  country: string
  is_customer: boolean
  is_vendor: boolean
}

export function isUserAccount(obj: any): obj is UserAccount {
  return (
    (typeof obj === 'object' &&
      obj !== null &&
      typeof obj.first_name === 'string' &&
      typeof obj.last_name === 'string' &&
      typeof obj.email === 'string' &&
      obj.phone === null) ||
    (obj.email === null &&
      typeof obj.phone === 'string' &&
      obj.dob instanceof Date &&
      typeof obj.country === 'string' &&
      typeof obj.is_customer === 'boolean' &&
      typeof obj.is_vendor === 'boolean')
  )
}
