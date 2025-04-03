import { HTMLAttributes } from "react"

interface StepperPanelProps extends HTMLAttributes<HTMLDivElement> {
  index: number,
  selectedIndex: number
}

export default function StepperPanel({
  index,
  selectedIndex,
  children,
  ...props
}: StepperPanelProps) {
  if (index !== selectedIndex) {
    return null;
  }

  return (
    <div
      {...props}
      role="tabpanel"
    >
      {children}
    </div>
  )
}