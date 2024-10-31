import { getAuth } from 'firebase/auth'
import { getApp, getApps, initializeApp } from 'firebase/app'

const appName = 'thrift-app-client'

export const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FB_CONFIG!)

if (!getApps().find((app) => app?.name === appName))
  initializeApp(firebaseConfig, appName)
export const auth = getAuth(getApp(appName))
