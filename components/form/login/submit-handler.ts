import axios, { AxiosError, AxiosResponse } from 'axios'
import jwtDecode from 'jwt-decode'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { UseFormSetError } from 'react-hook-form'
import { LoginFormState, ResponseData } from './types'

export default async function submitHandler(
  setUser: any,
  setError: UseFormSetError<LoginFormState>,
  router: AppRouterInstance,
  data: LoginFormState
) {
  const loginData = data
  if (data.email === '') {
    loginData.email = null
  } else if (data.phone === '') {
    loginData.phone = null
  }
  let response: AxiosResponse<ResponseData> | null = null
  try {
    if (process.env.NEXT_PUBLIC_SERVER)
      response = await axios.post(
        process.env.NEXT_PUBLIC_SERVER + '/v1/auth/login',
        loginData
      )
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
      if (process.env.NEXT_PUBLIC_SERVER) {
        const user = await fetch(
          process.env.NEXT_PUBLIC_SERVER + '/v1/account',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ).then((res) => res.json())
        if (token) setUser({ ...user, token })
      }
    }
    // re-route to previous page
    router.push('/')
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
