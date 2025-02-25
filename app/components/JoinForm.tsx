"use client"
import { applicationCreate } from '@/lib/action'
import React, { ChangeEvent, useState } from 'react'
import { instruments } from '../constants/instruments'
import { useRouter } from 'next/navigation'



interface JoinFormProps {
  eventId: string;
  hasApplied:any
  
}

const JoinForm  = ({ eventId,hasApplied}:JoinFormProps)  => {
  const router = useRouter()
    const [message, setMessage] = useState("")
    
    


    const onChangeMessage = (e:ChangeEvent<HTMLTextAreaElement>)=>{
setMessage(e.target.value)
    }


    const handleSubmit =async(formData: FormData)=>{
        try {
          
            const result = await applicationCreate(formData,eventId)
            if (result.success) {
              
              alert(result.message)
               router.push("/join")
            
             
            }else{
              alert(result.message)
            }
        } catch (error) {
          console.error("応募申請ができません", error);
          alert("応募申請中にエラーが発生しました");
        }

    }


  return (
    <form className="space-y-4" action={handleSubmit}>

<div>
          <label htmlFor="instrument" className=" mb-1 font-medium">
            応募楽器
          </label>
         
        {hasApplied.length ?  
         <span>: {hasApplied[0].instrument}</span>
        : 
        
        <select id="instrument" name="instrument"  className="w-full border rounded-md p-2">
           
        {instruments.map((instrument)=>(
            <option key={instrument}>{instrument}</option>
           
        ))}
      </select>
        
   
        
        }
           
        
         
        </div>
    
    <div>
      <label htmlFor="pr" className="block mb-1 font-medium">
        自己PR
      </label>
      {hasApplied ?
      <textarea
      disabled={true}
       className="w-full border rounded-md p-2"
       value={hasApplied[0].message}
      >
       
      </textarea>
      :  <textarea
        id="pr"
        name="message"
        rows={2}
        className="w-full border rounded-md p-2"
        placeholder="簡単な自己PRを入力してください"
        value={message}
        onChange={onChangeMessage}
        
      ></textarea>}
     


    </div>
    <div>
         {hasApplied.length>0? 
    <button type="submit" disabled className="bg-gray-500 text-white px-4 py-2 rounded cursor-not-allowed ">
      応募済みです
    </button>:
     <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
      応募する
    </button>}
    
    </div>
  </form>
  )
}

export default JoinForm