export function IconButton({
  children,
  className,
  onClick,
  disabled,
  ...props
}: {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick: () => void
}) {
  /* className ?? '' */
  return (
    <button
      className={
        className ??
        'dark:border-gray-200 border-gray-900 border-[.5pt] rounded-md px-4 py-2'
      }
      onClick={onClick}
      disabled={disabled ?? false}
      {...props}
    >
      {children}
    </button>
  )
}
