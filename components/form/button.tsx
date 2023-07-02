interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="w-full px-4 py-2 my-8 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      {...props}
    >
      {children}
    </button>
  )
}
