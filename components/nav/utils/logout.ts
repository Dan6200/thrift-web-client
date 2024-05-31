import { Token } from '@/app/auth/types'
import { UserAccount } from '@/components/user-account/types'
import axios, { AxiosError } from 'axios'
import jwtDecode from 'jwt-decode'

export const logout = async (user: UserAccount, setUser: any) => {
  if (process.env.NEXT_PUBLIC_SERVER) {
    try {
      const decoded = jwtDecode<Token>(user.token)
      if ('exp' in decoded && decoded.exp * 1000 >= Date.now()) {
        await axios.delete(process.env.NEXT_PUBLIC_SERVER + '/v1/auth/logout', {
          headers: { Authorization: `Bearer ${user.token}` },
        })
      }
      await setUser(null)
    } catch (err) {
      if (err) {
        if (err instanceof AxiosError) console.error(err?.response?.data)
        console.error(err)
        throw new Error('Could not logout user')
      }
    }
  } else throw new Error('Could not logout user')
}
