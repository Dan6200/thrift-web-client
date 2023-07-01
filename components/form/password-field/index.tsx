interface PasswordFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
export function PasswordField({ ...props }: PasswordFieldProps) {
  return <input type="password" {...props} />;
}
