import { InputHTMLAttributes, ForwardedRef, forwardRef } from 'react'

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {}
function field(
  { ...props }: PasswordFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return <input type="password" {...props} ref={ref} />
}

export const PasswordField = forwardRef(field)
