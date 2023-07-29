import { InputHTMLAttributes, ForwardedRef, forwardRef } from 'react'

interface ContactFieldProps extends InputHTMLAttributes<HTMLInputElement> {}
export function field(
  { ...props }: ContactFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return <input {...props} ref={ref} />
}

export const ContactField = forwardRef(field)
