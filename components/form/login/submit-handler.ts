import axios, { AxiosResponse } from 'axios'
import { LoginFormState, ResponseData } from './types'

const SERVER = 'https://thrift-dev.onrender.com/v1/auth/login'

export default async (setUserToken: any, data: LoginFormState) => {
  const loginData = data
  if (data.email === '') {
    loginData.email = null
  } else if (data.phone === '') {
    loginData.phone = null
  }
  const response: AxiosResponse<ResponseData> = await axios.post(
    SERVER,
    loginData
  )
  if (!response) throw new Error('Unable to login, please try later')
  const { token } = response?.data
  if (token) setUserToken(token)
}
