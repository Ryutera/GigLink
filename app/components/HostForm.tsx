"use client"
import React, { useState } from 'react'
import { instruments } from '../constants/instruments'

const HostForm = () => {
     const [place, setPlace] = useState("")
    const [detail, setDetail] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [selectedInstruments, setSelectedInstruments] = useState<string[]>([])

    const  onChangeEvent = (e: { target: { value: React.SetStateAction<string> } } )=>{
      setDetail(e.target.value)
    }
    const  onChangePlace = (e: { target: { value: React.SetStateAction<string> } } )=>{
        setPlace(e.target.value)
      }
      const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value)
      }
    
      const onChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime(e.target.value)
      }
// クリックしたやつが既に含まれてれば(チェック済だったら)フィルターしてcheck外す
      const toggleInstrument = (instrument: string) => {
        setSelectedInstruments((prev) =>
         prev.includes(instrument) ? prev.filter((i)=>i !==instrument): [...prev, instrument]
        )
      }
  return (
    <div className="max-w-2xl mx-auto">
    <h2 className="text-3xl font-bold mb-6">ライブイベントを作成</h2>
    <form className="space-y-4">
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
            時間
          </label>
          <input value={time}  type="time" id="time" className="w-full border rounded-md p-2" onChange={onChangeTime }/>
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