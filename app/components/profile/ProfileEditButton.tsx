import React from 'react'
import { useFormStatus } from 'react-dom'

const ProfileEditButton = () => {
    const {pending}=useFormStatus()
    return(
      <button
      type="submit"
      disabled={pending}
      className="px-6 py-3 bg-gradient-to-r disabled:bg-gray-500  bg-blue-600 text-white font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition hover:-translate-y-0.5 active:translate-y-0 "
     
    >
      {pending?"更新中です...":"プロフィールを更新する"}
    </button>
    )
}

export default ProfileEditButton


