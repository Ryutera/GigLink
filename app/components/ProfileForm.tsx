'use client'

import React, { useEffect, useState } from 'react'

import { ProfileUpdate } from '@/lib/action'
import { useRouter } from 'next/navigation'
import { instruments } from '../constants/instruments'
import Link from 'next/link'
import { User } from '@prisma/client'




interface ProfileFormProps {
user:User
  userId: string;
}



const ProfileForm = ({user, userId}:ProfileFormProps) => {
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>(user.instruments)
  const [bio, setBio] = useState<string>(user.bio || '')
  const [editable, setEditable] = useState(true)
  const router = useRouter()



 useEffect(()=>{
if (user.id===userId) {
 setEditable(true)
}else{
  setEditable(false)
}
 },[user,userId])

  
  const handleInstrumentChange = (instrument: string) => {
   setSelectedInstruments((prev)=>
    prev.includes(instrument)? 
   prev.filter((i)=>i!==instrument)
   : [...prev,instrument]
  
  )

  }

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value)
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e.currentTarget)
    const formData = new FormData(e.currentTarget)
    formData.append("instruments", JSON.stringify(selectedInstruments))
    try {
      await ProfileUpdate(formData)
      router.refresh()
      alert('プロフィールが更新されました')
    } catch (error) {
     
      alert('プロフィールの更新に失敗しました')
    }
  }

  const onClickBack =()=>{
    router.back()
  }

  return (
    
      <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6 ">Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
      <div>
        {editable? 
       
       <>
        <label htmlFor="username" className="block mb-1 font-medium">
        Username
       </label>
       <input
         type="text"
         id="username"
         className="w-full border rounded-md p-2"
         defaultValue={user.name}
         disabled={!editable}
         
       /></>:
       <>
       <span>Username</span>
       <p className="text-xl">{user.name}</p>
       </>
       }
          
        </div>


<div>
        <label className="block mb-1 font-medium">楽器パート</label>
        <div className="flex flex-wrap gap-2">
          {editable?
            
           
          
          instruments.map((instrument) => (
            <label key={instrument} className="grid-cols-4 items-center" >
              <input  type="checkbox" className="form-checkbox"  checked={selectedInstruments.includes(instrument)}
                  onChange={()=>handleInstrumentChange(instrument)}    />
              <span className="ml-2">{instrument}</span>
            </label>
          ))
        
        :
        selectedInstruments.map((instrument)=><div key={instrument}>
              <span>{instrument}</span>
            </div>)
        }
          
        </div>
      </div>

{editable ?<div>
          <label htmlFor="bio" className="block mb-1 font-medium">
            自己紹介
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            className="w-full border rounded-md p-2"
            placeholder="自己紹介を入力してください"
            value={bio}
            onChange={handleBioChange}
           
          ></textarea>
        </div> :
        <div>
        <label htmlFor="bio" className="block mb-1 font-medium">
          自己紹介
        </label>
        <div
          className="w-full bg-gray-50 rounded-md p-2 mb-7"
        >  {bio}</div>
      </div> }
        


        {editable ? 
      
        <div className='flex place-content-between'>
        <button type="submit"  className={`  hover:bg-blue-500"} bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition `}>
          Update Profile
        </button>
        <button type="button" onClick={onClickBack}  className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'>戻る</button> 
        </div>:
          <button type="button" onClick={onClickBack}  className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'>戻る</button> 
}
       
      </form>

      
      </div>
    
  )
}

export default ProfileForm