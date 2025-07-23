"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent,  DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'

interface RedirectProps {
  onClose?: () => void
}

const Redirect = ({ onClose }: RedirectProps) => {
    const router = useRouter()
    const [open, setOpen ] = useState(true)

    const handleClose = ()=>{
        setOpen((prev)=>!prev)
        onClose?.()
    }
    
  return (
    <Dialog open={open} onOpenChange={handleClose}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Login Required</DialogTitle>
        
      </DialogHeader>
      <div className="py-4">
        <p className="text-sm text-gray-600">
        Please log in if you already have an account, or sign up if you're new.
        </p>
      </div>
      <DialogFooter className="flex flex-col sm:flex-row gap-2">
        <Button onClick={()=>{router.back()}}  className="bg-gray-300 w-full text-gray-700 hover:bg-gray-400">
          Back
        </Button>
        <Button onClick={()=>{redirect("/sign-up")}} className="bg-blue-400 w-full text-white hover:bg-blue-500">
          Sign-up / Login
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default Redirect