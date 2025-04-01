"use client"

import type React from "react"
import { instruments } from "@/app/constants/instruments"
import type { User } from "@prisma/client"
import ProfileEditButton from "./ProfileEditButton"

interface Props {
  user: User
  selectedInstruments: string[]
  handleInstrumentChange: (instrument: string) => void
  bio: string
  handleBioChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const ProfileFormEdit = ({ user, selectedInstruments, handleInstrumentChange, bio, handleBioChange }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <div className="space-y-6">
        <div className="transition duration-300 ease-in-out transform hover:scale-[1.01]">
          <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-900
  hover:bg-gray-50 hover:cursor-not-allowed
  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            defaultValue={user.name}
            disabled
          />
          <p className="mt-1 text-xs text-gray-500">Username cannot be changed</p>
        </div>

        {/* Instruments Section */}
        <div className="transition duration-300 ease-in-out transform hover:scale-[1.01]">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Instruments You Play</label>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {instruments.map((instrument) => (
                <label
                  key={instrument}
                  className={`flex items-center p-2 rounded-md cursor-pointer transition ${
                    selectedInstruments.includes(instrument)
                      ? "bg-blue-100 border border-blue-300"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    checked={selectedInstruments.includes(instrument)}
                    onChange={() => handleInstrumentChange(instrument)}
                  />
                  <span className="ml-2 text-sm">{instrument}</span>
                </label>
              ))}
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">Please select all instruments you can play</p>
        </div>

        {/* Bio Section */}
        <div className="transition duration-300 ease-in-out transform hover:scale-[1.01]">
          <label htmlFor="bio" className="block text-sm font-semibold text-gray-700 mb-2">
            About Me
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={5}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Share your musical experience, favorite genres, goals, and more..."
            value={bio}
            onChange={handleBioChange}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-center">
          <ProfileEditButton />
        </div>
      </div>
    </div>
  )
}

export default ProfileFormEdit

