"use client";

import React, { useEffect, useState } from "react";

import { ProfileUpdate } from "@/lib/action";
import { useRouter } from "next/navigation";
import { instruments } from "../../constants/instruments";
import { User } from "@prisma/client";

import ProfileFormEdit from "./ProfileFormEdit";
import ProfileFormView from "./ProfileFormView";




interface ProfileFormProps {
  user: User;
  userId: string;
}

const ProfileForm = ({ user, userId }: ProfileFormProps) => {
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>(
    user.instruments
  );
  const [bio, setBio] = useState<string>(user.bio || "");
  const [editable, setEditable] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user.id === userId) {
      setEditable(true);
    } else {
      setEditable(false);
    }
  }, [user, userId]);

  const handleInstrumentChange = (instrument: string) => {
    setSelectedInstruments((prev) =>
      prev.includes(instrument)
        ? prev.filter((i) => i !== instrument)
        : [...prev, instrument]
    );
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget);
    const formData = new FormData(e.currentTarget);
    formData.append("instruments", JSON.stringify(selectedInstruments));
    try {
      await ProfileUpdate(formData);
      router.refresh();
      alert("プロフィールが更新されました");
    } catch (error) {
      alert("プロフィールの更新に失敗しました");
    }
  };

  const onClickBack = () => {
    router.back();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6 ">Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
       {editable? 
       <ProfileFormEdit user={user} selectedInstruments={selectedInstruments} handleInstrumentChange={handleInstrumentChange} bio={bio} handleBioChange={handleBioChange} onClickBack={onClickBack}/>
       : <ProfileFormView user={user} selectedInstruments={selectedInstruments}  bio={bio}  onClickBack={onClickBack}/>}

      </form>
    </div>
  );
};

export default ProfileForm;
