import type React from "react"
import { cn } from "@/lib/utils"

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  isEditable: boolean
}

const CustomInput: React.FC<CustomInputProps> = ({ label, type, isEditable, className, ...props }) => {
  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium text-red-500 mb-1">
        {label}
      </label>
      <input
        {...props}
        disabled={!isEditable}
        type={type}
        className={cn(
          "w-full px-3 py-2 text-red-500 disabled:(text-gray-900 opacity-100)",
          isEditable
            ? "border shadow-sm rounded-md  border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            : "bg-white cursor-default ",

        )}
      />
    </div>
  )
}

export default CustomInput

