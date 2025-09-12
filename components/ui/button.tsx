import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A5F] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#FF5A5F] text-white hover:bg-[#E34850] rounded-lg shadow-sm hover:shadow-md active:scale-[0.98]",
        destructive: "bg-red-500 text-white hover:bg-red-600 rounded-lg",
        outline: "border border-[#B0B0B0] bg-white text-[#222222] hover:border-[#222222] hover:shadow-md rounded-lg active:scale-[0.98]",
        secondary: "bg-[#F7F7F7] text-[#222222] hover:bg-[#EBEBEB] rounded-lg",
        ghost: "text-[#222222] hover:bg-[#F7F7F7] rounded-lg",
        link: "text-[#FF5A5F] underline-offset-4 hover:underline",
        premium: "bg-gradient-to-r from-[#FF5A5F] to-[#FC642D] text-white hover:from-[#E34850] hover:to-[#E5562A] rounded-lg shadow-md hover:shadow-lg active:scale-[0.98]",
      },
      size: {
        default: "h-12 px-6 text-sm",
        sm: "h-10 px-4 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "h-12 w-12",
        xl: "h-16 px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }