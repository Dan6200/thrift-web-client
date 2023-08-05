import axios, { AxiosResponse } from 'axios'
import { BaseSyntheticEvent } from 'react'
import { LoginFormState } from './types'

const SERVER = 'https://thrift-dev.onrender.com/v1/auth/register'

export default async (data: LoginFormState, e: BaseSyntheticEvent) => {
  e?.preventDefault()
  const formData = data
  let response: AxiosResponse<'token', string> | null = null
  try {
    response = await axios.post(SERVER, formData)
  } catch (err) {
    throw err
  }
  console.log(response?.data)
}
