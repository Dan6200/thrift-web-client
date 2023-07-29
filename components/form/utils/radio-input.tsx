interface RadioInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export function RadioInput({ children, ...props }: RadioInputProps) {
  return <input type="radio" {...props} />
}
