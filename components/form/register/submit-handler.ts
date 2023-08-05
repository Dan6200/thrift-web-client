import axios, { AxiosResponse } from 'axios'
import { BaseSyntheticEvent } from 'react'
import { RegisterFormState } from './types'

const SERVER = 'https://thrift-dev.onrender.com/v1/auth/register'
export default async (data: RegisterFormState, e?: BaseSyntheticEvent) => {
  e?.preventDefault()
  const formData = data
  const { confirm_password, ...userData } = formData
  console.log('formData', formData)
  console.log('userData', userData)
  let response: AxiosResponse<any, any> | null = null
  try {
    response = await axios.post(SERVER, userData)
  } catch (err) {
    throw err
  }
  alert('User created successfully')
  console.log(response?.data)
}
