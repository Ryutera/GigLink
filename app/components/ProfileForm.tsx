'use client'

import React, { useState } from 'react'

import { ProfileUpdate } from '@/lib/action'
import { useRouter } from 'next/navigation'
import { instruments } from '../constants/instruments'

interface ProfileFormProps {
  user: any
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>(user.instruments)
  const [bio, setBio] = useState<string>(user.bio || '')
  const router = useRouter()
  
  const handleInstrumentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(event.target.selectedOptions, (option) => option.value)
    setSelectedInstruments(options)
  }

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value)
  }

  const handleSubmit = async (formData: FormData) => {
    try {
      await ProfileUpdate(formData)
      router.refresh()
      alert('プロフィールが更新されました')
    } catch (error) {
     
      alert('プロフィールの更新に失敗しました')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Profile</h2>
      <form action={handleSubmit} className="space-y-4">
      <div>
          <label htmlFor="username" className="block mb-1 font-medium">
           Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full border rounded-md p-2"
            defaultValue={user.name}
            disabled
          />
        </div>
        <div>
          <label htmlFor="instruments" className="block mb-1 font-medium">
            担当楽器
          </label>
          <select
            id="instruments"
            name="instruments"
            className="w-full border rounded-md p-2"
            multiple
            size={7}
            value={selectedInstruments}
            onChange={handleInstrumentChange}
          >
            {instruments.map((instrument)=>(
  <option  key={instrument}>{instrument}</option>
            ))}
          
           
          </select>
        </div>
        <div>
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
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Update Profile
        </button>
      </form>
    </div>
  )
}

export default ProfileForm