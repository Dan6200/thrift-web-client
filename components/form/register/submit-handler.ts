import axios, { AxiosResponse } from 'axios'
import { RegisterFormState, ResponseData } from './types'

const SERVER = 'https://thrift-dev.onrender.com/v1/auth/register'
export default async (setUserToken: any, data: RegisterFormState) => {
  const formData = data
  const { confirm_password, ...userData } = formData
  if (formData.email === '') {
    userData.email = null
  } else if (formData.phone === '') {
    userData.phone = null
  }
  const response: AxiosResponse<ResponseData> = await axios.post(
    SERVER,
    userData
  )
  if (!response) throw new Error('Unable to register, please try later')
  const { token } = response?.data
  if (token) setUserToken(token)
}
