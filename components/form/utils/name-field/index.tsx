import { InputHTMLAttributes, ForwardedRef, forwardRef } from 'react'

interface NameFieldProps extends InputHTMLAttributes<HTMLInputElement> {}
function field(
  { ...props }: NameFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return <input {...props} ref={ref} />
}

export const NameField = forwardRef(field)
