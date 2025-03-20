import type React from "react"
import { cn } from "@/lib/utils"

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  isEditable: boolean
}

// `React.InputHTMLAttributes<HTMLInputElement>`を継承しているため、`type`や`value`などの標準的なinput要素のプロパティはすべて自動的に含まれている。
const CustomInput: React.FC<CustomInputProps> = ({ label, type, isEditable, className, ...props }) => {
  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-900 mb-1">
        {label}
      </label>
      <input
        {...props}
        disabled={!isEditable}
        type={type}
        className={cn(
          "w-full px-3 py-2 !text-gray-900  opacity-100",
          isEditable
            ? "border shadow-sm rounded-md  border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            : "bg-white cursor-default ",

        )}
      />
    </div>
  )
}

export default CustomInput

