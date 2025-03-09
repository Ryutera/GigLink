import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

interface FloatingActionButtonProps {
    href: string
    label: string
  }

const FloatingButton = ({href,label}: FloatingActionButtonProps) => {
  return (
   
<Button className="
fixed 
    bottom-6 
    left-1/2 
    -translate-x-1/2 
    bg-blue-500 
    hover:bg-blue-600 
    md:hidden 
    rounded-full 
    w-12 
    h-12 
    flex 
    items-center 
    justify-center 
    shadow-lg 
    z-50">
          <Link href={href}>{label}</Link>
        </Button>
        
  )
}

export default FloatingButton