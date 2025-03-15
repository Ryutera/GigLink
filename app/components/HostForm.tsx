"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { instruments } from "../constants/instruments"
import { EventCreate } from "@/lib/action"
import LocationInput from "./LocationInput"
import FormInput from "./form/FormInput"
import InstrumentSelector from "./form/InstrumentSelector"
import FormTextarea from "./form/FormTextarea"
import { EventFormData } from "@/types/hostform"


const HostForm: React.FC = () => {
  const router = useRouter()

  // 単一のオブジェクトで状態を管理
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    place: "",
    detail: "",
    date: "",
    startTime: "",
    endTime: "",
    selectedInstruments: [],
    latitude: null,
    longitude: null,
  })

  // 汎用的な入力ハンドラー
  //idがplaceだったらplaceに
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  // 位置情報の更新
  const setCoordinates = (lat: number, lng: number) => {
    
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }))
   
  }


  // 場所の更新（LocationInputコンポーネントから）
  const setPlace = (place: string) => {
    setFormData((prev) => ({
      ...prev,
      place,
    }))
  }

  // 楽器選択の切り替え
  const toggleInstrument = (instrument: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedInstruments: prev.selectedInstruments.includes(instrument)
        ? prev.selectedInstruments.filter((i) => i !== instrument)
        : [...prev.selectedInstruments, instrument],
    }))
  }

  // フォーム送信処理
  const handleSubmit = async (formDataSubmit: FormData) => {
    try {
      const result = await EventCreate({
        ...formData,
        // FormDataオブジェクトからは使用しないが、型の一貫性のために必要
      })

      if (result.success) {
        alert(result.message)
        console.log("formdataです",FormData)
        // フォームをリセット
        setFormData({
          title: "",
          place: "",
          detail: "",
          date: "",
          startTime: "",
          endTime: "",
          selectedInstruments: [],
          latitude: null,
          longitude: null,
        })
        router.push("/host")
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error("イベントの作成ができません", error)
      alert("イベントの作成中にエラーが発生しました")
    }
  }

  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="max-w-2xl mx-auto p-7">
      <h2 className="text-3xl font-bold mb-6">ライブイベントを作成</h2>
      <form className="space-y-4" action={handleSubmit}>
        <FormInput
          id="title"
          label="イベントタイトル"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="タイトルを入力"
          required
        />

        <div>
          <label htmlFor="place" className="block mb-1 font-medium">
            場所
          </label>
          <LocationInput setPlace={setPlace} setCoordinates={setCoordinates}>
            <input
              id="place"
              value={formData.place}
              onChange={(e) => setPlace(e.target.value)}
              type="text"
              className="w-full border rounded-md p-2"
              placeholder="住所を入力"
              required
            />
          </LocationInput>
        </div>

        <div className="grid gap-4">
          <FormInput id="date" label="日付" value={formData.date} onChange={handleInputChange} type="date" required mintime={today} />

          <div className="grid md:grid-cols-2 gap-3">
            <FormInput
              id="startTime"
              label="開始時間"
              value={formData.startTime}
              onChange={handleInputChange}
              type="time"
              step="1800"
              required
            />

            <FormInput
              id="endTime"
              label="終了時間"
              value={formData.endTime}
              onChange={handleInputChange}
              type="time"
              step="1800"
              required
            />
          </div>
        </div>

        <InstrumentSelector
          instruments={instruments}
          selectedInstruments={formData.selectedInstruments}
          toggleInstrument={toggleInstrument}
        />

        <FormTextarea
          id="detail"
          label="イベント詳細"
          value={formData.detail}
          onChange={handleInputChange}
          placeholder="イベントの詳細情報を入力してください"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full md:w-auto"
        >
          イベントを作成
        </button>
      </form>
    </div>
  )
}

export default HostForm

