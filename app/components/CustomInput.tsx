import type React from "react"
import { cn } from "@/lib/utils"

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  isEditable: boolean
}

const CustomInput: React.FC<CustomInputProps> = ({ label, type, isEditable,  ...props }) => {
  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        {...props}
        disabled={!isEditable}
        type={type}
        className={cn(
          "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500",
          !isEditable && "bg-white cursor-default",
          
        )}
      />
    </div>
  )
}

export default CustomInput

