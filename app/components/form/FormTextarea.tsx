"use client"

import type React from "react"

interface FormTextareaProps {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  rows?: number
  className?: string
  required?: boolean
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  className = "",
  required = false,
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block mb-1 font-medium">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full border rounded-md p-2"
        required={required}
      />
    </div>
  )
}

export default FormTextarea

