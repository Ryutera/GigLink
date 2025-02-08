"use client"
import React, { useState } from 'react'
import { instruments } from '../constants/instruments'
import { EventCreate } from '@/lib/action'




const HostForm = () => {
    const [title, setTitle] = useState("")
     const [place, setPlace] = useState("")
    const [detail, setDetail] = useState("")
    const [date, setDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [selectedInstruments, setSelectedInstruments] = useState<string[]>([])

    

    const  onChangeTitle = (e: { target: { value: React.SetStateAction<string> } } )=>{
        setTitle(e.target.value)
      }

    const  onChangeEvent = (e: { target: { value: React.SetStateAction<string> } } )=>{
      setDetail(e.target.value)
    }
    const  onChangePlace = (e: { target: { value: React.SetStateAction<string> } } )=>{
        setPlace(e.target.value)
      }
      const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value)
      }
    
      const onChangesetStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartTime(e.target.value)
      }

      const onChangesetEndTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndTime(e.target.value)
      }


// クリックしたやつが既に含まれてれば(チェック済だったら)フィルターしてcheck外す
      const toggleInstrument = (instrument: string) => {
        setSelectedInstruments((prev) =>
         prev.includes(instrument) ? prev.filter((i)=>i !==instrument): [...prev, instrument]
        )
      }
    

      const handleSubmit = async (formData: FormData) => {
       
        const hostData = {
            title,
            place,
            detail,
            date,
            startTime,
            endTime,
            selectedInstruments
            
        }
        try {
            const result = await EventCreate(hostData);
            if (result.success) {
                alert(result.message);
                // フォームをクリア
                setTitle("");
                setPlace("");
                setDetail("");
                setDate("");
                setStartTime("");
                setEndTime(""); 
                setSelectedInstruments([]);
                
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("イベントの作成ができません", error);
            alert("イベントの作成中にエラーが発生しました");
        }
    }


  return (
    <div className="max-w-2xl mx-auto">
    <h2 className="text-3xl font-bold mb-6">ライブイベントを作成</h2>
    <form className="space-y-4" action={handleSubmit}>
    <div>
        <label htmlFor="title" className="block mb-1 font-medium">
          イベントタイトル
        </label>
        <input value={title} type="text" id="place" className="w-full border rounded-md p-2" placeholder="タイトルを入力" onChange={onChangeTitle}/>
      </div>
      <div>
        <label htmlFor="place" className="block mb-1 font-medium">
          場所
        </label>
        <input value={place} type="text" id="place" className="w-full border rounded-md p-2" placeholder="住所を入力" onChange={onChangePlace}/>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block mb-1 font-medium">
            日付
          </label>
          <input value={date}  type="date" id="date" className="w-full border rounded-md p-2" onChange={onChangeDate}/>
        </div>
        <div>
          <label htmlFor="time" className="block mb-1 font-medium">
            開始時間
          </label>
          <input value={startTime}  type="time" id="startTime" className="w-full border rounded-md p-2" onChange={onChangesetStartTime }/>
        </div>
        <div>
          <label htmlFor="time" className="block mb-1 font-medium">
            終了時間
          </label>
          <input value={endTime}  type="time" id="startTime" className="w-full border rounded-md p-2" onChange={onChangesetEndTime}/>
        </div>
      </div>
      <div>
        <label className="block mb-1 font-medium">募集楽器パート</label>
        <div className="flex flex-wrap gap-2">
          {instruments.map((instrument) => (
            <label key={instrument} className="grid-cols-4 items-center">
              <input type="checkbox" className="form-checkbox" checked={selectedInstruments.includes(instrument)}
                  onChange={() => toggleInstrument(instrument)}/>
              <span className="ml-2">{instrument}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
            <label htmlFor="details" className="block mb-1 font-medium">
              イベント詳細
            </label>
            <textarea
              id="details"
              rows={4}
              className="w-full border rounded-md p-2"
              placeholder="イベントの詳細情報を入力してください"
              onChange={onChangeEvent}
              value={detail}
            ></textarea>
          </div>


      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        イベントを作成
      </button>
    </form>
  </div>
  )
}

export default HostForm