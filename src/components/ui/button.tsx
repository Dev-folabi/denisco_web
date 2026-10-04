import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      primary: "btn-primary",
      accent: "btn-accent",
      outline: "btn-outline",
      "outline-light": "btn-outline-light",
      ghost: "btn-ghost",
      danger: "btn-danger",
      default: "btn-primary",
    },
    size: {
      default: "",
      sm: "btn-sm",
    },
    block: {
      true: "btn-block",
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
    block: false,
  },
})

function Button({
  className,
  variant = "primary",
  size = "default",
  block = false,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, block }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
