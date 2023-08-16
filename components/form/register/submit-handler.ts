import axios, { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { UseFormSetError } from 'react-hook-form'
import { RegisterFormState, ResponseData } from './types'

const SERVER = 'https://thrift-dev.onrender.com/v1'
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
    response = await axios.post(SERVER + '/auth/register', userData)
    if (response == null) {
      setError('root', {
        type: 'server',
        message:
          'An error occurred while trying to create an account. Please try again later',
      })
      return
    }
    const { data } = response
    if (data) {
      const { token } = data
      const user = await fetch(
        SERVER + '/account' + { headers: { Authorization: `Bearer ${token}` } }
      ).then((res) => res.json())
      console.log(user)
      if (token) setUser({ ...user, token })
    }
    // re-route to home
    useRouter().push('/')
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
            'An error occurred while trying to create an account. Please try again later',
        })
      }
    }
  }
}
