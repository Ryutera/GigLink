"use client"

import type React from "react"

interface FormInputProps {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  placeholder?: string
  className?: string
  step?: string
  required?: boolean
  mintime?: string 
  
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  className = "",
  step,
  required = false,
  mintime
 
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block mb-1 font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border rounded-md p-2"
        step={step}
        required={required}
        min={mintime}
      />
    </div>
  )
}

export default FormInput

