import { createUserWithEmailAndPasswordWrapper } from '@/app/auth/firebase'
import { isUserAccount } from '@/components/user-account/types'
import axios, { AxiosError } from 'axios'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { UseFormSetError } from 'react-hook-form'
import { RegisterFormState } from './types'

export default async function submitHandler(
  setUser: any,
  setError: UseFormSetError<RegisterFormState>,
  router: AppRouterInstance,
  data: RegisterFormState
) {
  const formData = data
  const { confirm_password, ...userData } = formData
  if (formData.email === '') {
    userData.email = null
  } else if (formData.phone === '') {
    userData.phone = null
  }
  let response = null
  try {
    response = await createUserWithEmailAndPasswordWrapper(
      userData.email!,
      userData.password
    )
    if (response == null) {
      setError('root', {
        type: 'server',
        message:
          'An error occurred while trying to create an account. Please try again later',
      })
      return
    }
    const { result: user } = response
    const { confirm_password, password, ...dbData } = data
    if (typeof user !== 'string') {
      const token = await user.getIdToken()
      if (process.env.NEXT_PUBLIC_SERVER) {
        await axios
          .post(process.env.NEXT_PUBLIC_SERVER + '/v1/users', dbData, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            const { uid } = res.data
            if (uid)
              axios(process.env.NEXT_PUBLIC_SERVER + '/v1/users', {
                headers: { Authorization: `Bearer ${token}` },
              }).then((res) => {
                const { data: user } = res
                if (!isUserAccount(user))
                  throw new Error('Invalid Response Type: /v1/users')
                setUser({ ...user, token })
              })
          })
          .catch((e) => {
            console.error('Unable to save user data: ' + e)
          })
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
            'An error occurred while trying to create an account. Please try again later',
        })
      }
    }
  }
}
