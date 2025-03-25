import * as React from "react"
import { cn } from "@/lib/utils"
import { Info } from "lucide-react"

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Alert({ className, children, ...props }: AlertProps) {
  return (
    <div
      className={cn(
        "relative w-full rounded-lg border p-3 flex items-start gap-3",
        className
      )}
      role="alert"
      {...props}
    >
      <Info className="h-4 w-4 mt-0.5" />
      <div>{children}</div>
    </div>
  )
}

interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function AlertDescription({
  className,
  ...props
}: AlertDescriptionProps) {
  return (
    <div
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  )
}
