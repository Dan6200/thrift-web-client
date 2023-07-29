interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}
export function Label({ children, ...props }: LabelProps) {
  return <label {...props}>{children}</label>;
}
