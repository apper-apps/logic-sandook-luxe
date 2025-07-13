import Label from "@/components/atoms/Label"
import Input from "@/components/atoms/Input"
import { cn } from "@/utils/cn"

const FormField = ({ 
  label, 
  id, 
  error, 
  className, 
  labelClassName,
  inputClassName,
  ...props 
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={id} className={labelClassName}>
          {label}
        </Label>
      )}
      <Input
        id={id}
        className={cn(
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          inputClassName
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default FormField