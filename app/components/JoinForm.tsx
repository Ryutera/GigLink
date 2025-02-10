"use client"
import { applicationCreate } from '@/lib/action'
import React, { ChangeEvent, useState } from 'react'
import { instruments } from '../constants/instruments'
import { useRouter } from 'next/navigation'


const JoinForm = ({eventId}:{eventId:string}) => {
    const [message, setMessage] = useState("")
    const router = useRouter()

    const onChangeMessage = (e:ChangeEvent<HTMLTextAreaElement>)=>{
setMessage(e.target.value)
    }

    const hadleSubmit =async(formData: FormData)=>{
        try {
            const result = await applicationCreate(formData,eventId)
            if (result.success) {
              
              alert(result.message)
              router.push("/")
            
             
            }else{
              alert(result.message)
            }
        } catch (error) {
          console.error("応募申請ができません", error);
          alert("応募申請中にエラーが発生しました");
        }

    }


  return (
    <form className="space-y-4" action={hadleSubmit}>

<div>
          <label htmlFor="instrument" className="block mb-1 font-medium">
            応募楽器
          </label>
          <select id="instrument" name="instrument"  className="w-full border rounded-md p-2">
            {instruments.map((instrument)=>(
                <option key={instrument}>{instrument}</option>
               
            ))}
          </select>
        </div>
    
    <div>
      <label htmlFor="pr" className="block mb-1 font-medium">
        自己PR
      </label>
      <textarea
        id="pr"
        name="message"
        rows={4}
        className="w-full border rounded-md p-2"
        placeholder="簡単な自己PRを入力してください"
        value={message}
        onChange={onChangeMessage}
      ></textarea>
    </div>
    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
      応募する
    </button>
  </form>
  )
}

export default JoinForm