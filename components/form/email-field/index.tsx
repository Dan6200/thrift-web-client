interface EmailFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export function EmailField({ ...props }: EmailFieldProps) {
  return <input type="email" {...props} />;
}
