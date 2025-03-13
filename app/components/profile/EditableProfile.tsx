import React from "react";
import { instruments } from "@/app/constants/instruments";
import { User } from "@prisma/client";

interface Props {
  user: User;
  selectedInstruments: string[];
  handleInstrumentChange: (instrument: string) => void;
  bio: string;
  handleBioChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClickBack: () => void;
}

const ProfileFormEdit = ({
  user,
  selectedInstruments,
  handleInstrumentChange,
  bio,
  handleBioChange,
  onClickBack,
}: Props) => {
  return (
    <div className="flex flex-col md:gap-8 gap-7">
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
        <label className="block mb-1 font-medium">楽器パート</label>
        <div className="flex flex-wrap md:gap-3 gap-7">
          {instruments.map((instrument) => (
            <label key={instrument} className="grid-cols-4 items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedInstruments.includes(instrument)}
                onChange={() => handleInstrumentChange(instrument)}
              />
              <span className="ml-2">{instrument}</span>
            </label>
          ))}
        </div>
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

      <div className="flex place-content-between">
        <button
          type="submit"
className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Update Profile
        </button>
        <button
          type="button"
          onClick={onClickBack}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          戻る
        </button>
      </div>
    </div>
  );
};

export default ProfileFormEdit;
