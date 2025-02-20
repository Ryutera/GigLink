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

const EventInfo = ({ event, userId, onSubmit }: any) => {
  const [title, setTitle] = useState(event?.title)
  const [description, setDescription] = useState(event?.description)
  const [requiredInstrument, setRequiredInstrument] = useState(event?.instruments[0] || "")
  const [date, setDate] = useState<Date | undefined>(event?.date)
  const [startTime, setStartTime] = useState(event?.startTime.toISOString().substring(11, 16))
  const [endTime, setEndTime] = useState(event?.endTime.toISOString().substring(11, 16))
  const [location, setLocation] = useState(event?.location)

  const isOrganizer = event?.organizer.id === userId

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("requiredInstrument", requiredInstrument)
    formData.append("date", date?.toISOString() || "")
    formData.append("startTime", startTime)
    formData.append("endTime", endTime)
    formData.append("location", location)
    onSubmit(formData)
  }

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-3xl font-bold">
        {isOrganizer ? `ライブイベント "${title}" を編集` : `ライブイベント "${title}" の詳細`}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div>
          <label htmlFor="instrument" className="block text-sm font-medium text-gray-700 mb-1">
            募集楽器
          </label>
          <Select value={requiredInstrument} onValueChange={setRequiredInstrument} disabled={!isOrganizer}>
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
          </Select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            イベント詳細
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px]"
            disabled={!isOrganizer}
          />
        </div>

    
      </form>
    </div>
  )
}

export default EventInfo

