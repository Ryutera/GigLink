"use client"

import { useRouter } from "next/navigation";
import { ChevronLeft } from 'lucide-react';
import React from 'react'





const BackButton = () => {
    const router = useRouter()
    const onClickBack=()=>{
        router.back()
        }
  return (
    <div className=" flex items-center justify-start px-4 py-2 rounded mt-10 cursor-pointer" onClick={onClickBack} >
   <ChevronLeft />
</div>

  )
}

export default BackButton