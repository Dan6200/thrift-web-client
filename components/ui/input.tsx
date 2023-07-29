import * as React from 'react'

import { cn } from '@/lib/utils'
import { Noop } from 'react-hook-form'
import { ContactType } from '../form/login/types'
import { RefCallBack } from 'react-hook-form'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (...event: any[]) => {}
  onBlur: Noop
  value: string | undefined
  name: 'email' | 'phone' | 'password'
  ref: RefCallBack
  placeholder?: '0804567890' | 'myemailaddress1234@mail.com'
  type: 'email' | 'phone' | 'password'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
