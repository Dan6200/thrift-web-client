interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}
export function Form({ children, ...props }: FormProps) {
  return <form {...props}>{children}</form>;
}
