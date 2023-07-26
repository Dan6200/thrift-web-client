import { IconButton } from '../icon-button'

export function PageButton({
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
  return (
    <IconButton
      className={className ?? undefined}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </IconButton>
  )
}
