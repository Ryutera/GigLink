"use client"

import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { instruments } from "../constants/instruments"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import ProfileForm from "./ProfileForm"

import { eventDeleteAction, eventEditAction } from "@/lib/action"


const EventInfo = ({ event, userId, onSubmit }: any) => {
  const [title, setTitle] = useState(event?.title)
  const [description, setDescription] = useState(event?.description)
  const [requiredInstrument, setRequiredInstrument] = useState(event?.instruments.map((i:any)=>i) || [])
  const [date, setDate] = useState(event?.date.toISOString())
  const [startTime, setStartTime] = useState(event?.startTime.toISOString().substring(11, 16))
  const [endTime, setEndTime] = useState(event?.endTime.toISOString().substring(11, 16))
  const [location, setLocation] = useState(event?.location)

  const isOrganizer = event?.organizer.id === userId
const eventId = event.id


  const handleSubmit = async (formData: FormData) => {
  
    const action = formData.get("action")

    const editData = {
        title,
        description,
        date, // YYYY-MM-DD 形式
        startTime,
        endTime,
        location,
        instruments:[requiredInstrument]
    }

    if (action === "delete") {
      if (window.confirm("本当にこのイベントを削除しますか？")) {
        const result = await eventDeleteAction(formData)
        if (result.success) {
          alert(result.message)
          // ここで削除後の処理（例：ページ遷移）を行う
        } else {
          alert(result.message)
        }
      }
    } else {
      // 編集の処理
     
      const result = await eventEditAction({eventId,editData})
      if (result.success) {
        alert(result.message)
      } else {
        alert(result.message)
      }
    }
  }


  const toggleInstrument =(instrument:string) =>{
    setRequiredInstrument((prev:any)=>prev.includes(instrument)? requiredInstrument.filter((i:string)=>i!==instrument):[...prev,instrument])
  }


  return (
    <div className="space-y-5 w-full mb-8">
      <h2 className="text-3xl font-bold">
        {isOrganizer ? `ライブイベント ${event.title} を編集` : `ライブイベント ${event.title} の詳細`}
      </h2>

      <form action={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              イベントタイトル
            </label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={!isOrganizer} />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              場所
            </label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={!isOrganizer}
            />
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              日付
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  disabled={!isOrganizer}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>日付を選択</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                開始時間
              </label>
              <Input
                type="time"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                disabled={!isOrganizer}
              />
            </div>
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                終了時間
              </label>
              <Input
                type="time"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                disabled={!isOrganizer}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2">
         
          {instruments.map((instrument) => (
             
            <label key={instrument} htmlFor="instrument" className="mr-3 block text-sm font-medium text-gray-700 mb-1">
           {instrument}
            
              <input  type="checkbox" className="form-checkbox" checked={requiredInstrument.includes(instrument)}
                  onChange={()=>toggleInstrument(instrument)}/>
                  
              <span className="ml-2"></span>
              </label>
          ))}
         
          {/* <Select value={requiredInstrument} onValueChange={setRequiredInstrument} disabled={!isOrganizer}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="楽器を選択" />
            </SelectTrigger>
            <SelectContent>
              {instruments.map((instrument) => (
                <SelectItem key={instrument} value={instrument}>
                  {instrument}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 ">
            イベント詳細
          </label>
          <Textarea
  id="description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="min-h-[70px]"  // もともとの100pxから60pxに変更
  disabled={!isOrganizer}
/>

        </div>
        {isOrganizer &&   <div className='flex gap-20 items-center justify-center'>

{/* ここをonclickにするのかsubmitにするのか直接actionにするのかわからん */}
<button type="submit" name="action" value="edit"  className="bg-green-400 hover:bg-green-500  text-white px-4 py-2 rounded  ">
編集する
</button>
<button type="submit" name="action" value="delete"   className="bg-red-500 text-white px-4 py-2 rounded  ">
削除する
</button>
</div>}
    
      </form>
    
     
    </div>
  )
}

export default EventInfo

