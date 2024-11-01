import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'

import { auth } from './config'

export async function createUserWithEmailAndPasswordWrapper(
  email: string,
  password: string
): Promise<
  | { result: User; message: string; success: true }
  | { result: string; message: string; success: false }
> {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    return {
      result: user,
      message: 'Created User Account Successfully',
      success: true,
    }
  } catch (error) {
    return {
      result: error instanceof Error ? error.toString() : 'Unknown Error',
      message: 'Failed to Create User.',
      success: false,
    }
  }
}

export async function signInWithEmailAndPasswordWrapper(
  email: string,
  password: string
): Promise<
  | { result: User; message: string; success: true }
  | { result: string; message: string; success: false }
> {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return {
      result: user,
      message: 'Signed In User Successfully',
      success: true,
    }
  } catch (error) {
    return {
      result: error instanceof Error ? error.toString() : 'Unknown Error',
      message: 'Failed to Sign In User.',
      success: false,
    }
  }
}

export async function signOutWrapper(setUser: any) {
  auth.signOut().catch(function (e: Error) {
    throw new Error('Error signing out -- Tag:2\n\t' + e)
  })
  await setUser(null)
}
