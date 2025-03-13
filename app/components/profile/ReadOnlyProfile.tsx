import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";

interface Props {
  user: User;
  selectedInstruments: string[];
  bio: string;
  onClickBack: () => void;
}

const ProfileFormView = ({
  user,
  selectedInstruments,
  bio,
  onClickBack,
}: Props) => {
  return (
    <div>
      <div>
        <Avatar>
          <AvatarImage src={user.image || undefined} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="text-xl">{user.name}</span>
      </div>

      <div>
        <label className="block mb-1 font-medium">楽器パート</label>
        <div className="flex flex-wrap gap-2">
          {selectedInstruments.map((instrument) => (
            <div key={instrument}>
              <span>{instrument}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="bio" className="block mb-1 font-medium">
          自己紹介
        </label>
        <div className="w-full bg-gray-50 rounded-md p-2 mb-7"> {bio}</div>
      </div>

      <button
        type="button"
        onClick={onClickBack}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        戻る
      </button>
    </div>
  );
};

export default ProfileFormView;
