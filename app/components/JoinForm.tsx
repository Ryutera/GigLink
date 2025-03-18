"use client";
import { applicationCreate, deleteApplication } from "@/lib/action";
import React, { ChangeEvent, useState } from "react";
import { instruments } from "../constants/instruments";


interface JoinFormProps {
  eventId: string;
  hasApplied: any;
  userId: string;
}

const JoinForm = ({ eventId, hasApplied, userId }: JoinFormProps) => {
  const [message, setMessage] = useState("");

  const onChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await applicationCreate(formData, eventId);
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("応募申請ができません", error);
      alert("応募申請中にエラーが発生しました");
    }
  };

  const onClickDelete = async () => {
    try {
      if (window.confirm("本当に申請を取り消しますか")) {
        const result = await deleteApplication(eventId, userId);
        if (result.success) {
          alert(result.message);
        } else {
          alert(result.message);
        }
      }
    
    } catch (error) {
      alert("申請の取り消し中にエラーが発生しました");
    }
  };

  return (
    <form className="space-y-4" action={handleSubmit}>
      <div>
        <label htmlFor="instrument" className=" mb-1 font-medium">
          応募楽器
        </label>

        {hasApplied.length ? (
          <span>: {hasApplied[0].instrument}</span>
        ) : (
          <select
            id="instrument"
            name="instrument"
            className="w-full border rounded-md p-2  border-indigo-500"
          >
            {instruments.map((instrument) => (
              <option key={instrument}>{instrument}</option>
            ))}
          </select>
        )}
      </div>

      <div>
        <label htmlFor="pr" className="block mb-1 font-medium">
          自己PR
        </label>
        {hasApplied.length ? (
          <textarea
            disabled
            className="w-full border rounded-md p-2 bg-white"
            value={hasApplied[0]?.message}
          ></textarea>
        ) : (
          <textarea
            id="pr"
            name="message"
            rows={2}
            className="w-full border rounded-md p-2 border-indigo-500"
            placeholder="簡単な自己PRを入力してください"
            value={message}
            onChange={onChangeMessage}
          ></textarea>
        )}
      </div>
      <div>
        {hasApplied.length > 0 ? (
          <div className="flex justify-between">
            <button
              disabled
              className="bg-gray-500 text-white px-4 py-2 rounded cursor-not-allowed "
            >
              応募済みです
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={onClickDelete}
            >
              削除する
            </button>
          </div>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            
          >
            応募する
          </button>
        )}
      </div>
    </form>
  );
};

export default JoinForm;
