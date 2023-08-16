import axios, { AxiosError, AxiosResponse } from 'axios'
import { UseFormSetError } from 'react-hook-form'
import { LoginFormState, ResponseData } from './types'

const SERVER = 'https://thrift-dev.onrender.com/v1/auth/login'

export default async (
  setUser: any,
  setError: UseFormSetError<LoginFormState>,
  data: LoginFormState
) => {
  const loginData = data
  if (data.email === '') {
    loginData.email = null
  } else if (data.phone === '') {
    loginData.phone = null
  }
  let response: AxiosResponse<ResponseData> | null = null
  try {
    response = await axios.post(SERVER, loginData)
    if (response == null) {
      setError('root', {
        type: 'server',
        message:
          'An error occurred while trying to sign in. Please try again later',
      })
      return
    }
    const { data } = response
    if (data) {
      const { token } = data
      if (token) setUser({ token })
    }
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      if (err.response && err.response.status >= 400) {
        setError('root', {
          type: 'server',
          message: err.response.data?.message as string,
        })
      } else {
        setError('root', {
          type: 'server',
          message:
            'An error occurred while trying to login. Please try again later',
        })
      }
    }
  }
}
