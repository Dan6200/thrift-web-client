import axios, { AxiosResponse } from 'axios'
import { BaseSyntheticEvent } from 'react'
import { RegisterFormState } from './types'

const SERVER = 'https://thrift-dev.onrender.com/v1/auth/register'
export default async (data: RegisterFormState, e?: BaseSyntheticEvent) => {
  e?.preventDefault()
  const formState = data
  if (formState.password !== formState.confirm_password) {
    throw new Error('Passwords do not match')
  }
  const { confirm_password, ...userData } = formState
  console.log('formState', formState)
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
