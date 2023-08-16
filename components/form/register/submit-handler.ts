import axios, { AxiosResponse } from 'axios'
import { UseFormSetError } from 'react-hook-form'
import { RegisterFormState, ResponseData } from './types'

const SERVER = 'https://thrift-dev.onrender.com/v1/auth/register'
export default async (
  setUser: any,
  setError: UseFormSetError<RegisterFormState>,
  data: RegisterFormState
) => {
  const formData = data
  const { confirm_password, ...userData } = formData
  if (formData.email === '') {
    userData.email = null
  } else if (formData.phone === '') {
    userData.phone = null
  }
  let response: AxiosResponse<ResponseData> | null = null
  try {
    response = await axios.post(SERVER, userData)
    if (response == null)
      throw new Error('Unable to register, please try later')
    const { data } = response
    if (data) {
      const { token } = data
      if (token) setUser({ token })
    }
  } catch (err) {
    if (response && response.status >= 400) {
      setError('root', {
        type: 'server',
        message: response.data?.message as string,
      })
    }
  }
}
