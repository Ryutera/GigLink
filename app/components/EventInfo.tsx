"use client"
import React, { useEffect, useState, useCallback } from "react"
import { instruments } from "../constants/instruments"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { eventDeleteAction, eventEditAction } from "@/lib/action"
import { useRouter } from "next/navigation"
import EventEditForm from "./EventEditForm"
import CustomInput from "./CustomInput"
import LocationInput from "./LocationInput"
import OrganizerDetail from "./OrganizerDetail"
import { MusicEvent } from "@/types/events"



interface Props{
  event:MusicEvent;
  userId:string | null;
}

const EventInfo = ({ event, userId }: Props) => {
  const [title, setTitle] = useState(event?.title)
  const [description, setDescription] = useState(event?.description)
  const [date, setDate] = useState(event?.date)
  const [startTime, setStartTime] = useState(event?.startTime.toISOString().substring(11, 16))
  const [endTime, setEndTime] = useState(event?.endTime.toISOString().substring(11, 16))
  const [location, setLocation] = useState(event?.location)
  const [requiredInstrument, setRequiredInstrument] = useState(event?.instruments || [])
  const [updateKey, setUpdateKey] = useState(0) // Key for forced re-rendering
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const router = useRouter()
  const isOrganizer = event.organizer?.id === userId
  const eventId = event.id

  const setCoordinates = (lat:number, lng:number)=>{
   
    setLatitude(lat)
    setLongitude(lng)
  }


  // Setting prevKey to trigger forced rendering because checkbox values don't update immediately
  // (previous values remain checked until page reload for proper display)
  const toggleInstrument = useCallback((instrument: string) => {
    setRequiredInstrument((prev: string[]) => {
      const newValue = prev.includes(instrument) ? prev.filter((i: string) => i !== instrument) : [...prev, instrument]
      setUpdateKey((prevKey) => prevKey + 1) // Update key to force re-rendering
      return newValue
    })
  }, [])

  useEffect(() => {
    console.log("requiredInstrument changed:", requiredInstrument)
  }, [requiredInstrument])

  const handleSubmit = async (formData: FormData) => {
    const action = formData.get("action")

    const editData = {
      title,
      description,
      date ,
      startTime,
      endTime,
      location,
      instruments: requiredInstrument,
      latitude,
      longitude,
    }

    if (action === "delete") {
      
      if (window.confirm("Are you sure you want to delete this event?")) {
        const result = await eventDeleteAction(eventId)
        if (result.success) {
          alert(result.message)
         
          router.push("/host")
        } else {
          
          alert(result.message)
        }
      }
    } else {
      if(window.confirm("Do you want to edit this event?")){
        const result = await eventEditAction({ eventId, editData })
      if (result.success) {
        alert(result.message)
        router.push(`/event_detail/${eventId}`)
      } else {
      
        alert(result.message)
      }
    }
      }
  }

  return (
    <div className="space-y-5 w-full mb-8 ">
      <h2 className="text-3xl font-bold">
        {isOrganizer ? `Edit Live Event ${event.title}` : `Live Event ${event.title} Details`}
      </h2>
      {isOrganizer ||<OrganizerDetail organizerName={event.organizer?.name} organizerImg={event.organizer?.image} organizerId={event.organizer?.id}/> }

      <div className="border-t border-gray-200 pt-4 mb-4">
      {/* <h3 className="text-xl font-semibold text-gray-800 mb-4">Event Information</h3> */}
    </div>

      <form action={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CustomInput
            label="Event Title"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            isEditable={isOrganizer}          
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <LocationInput setPlace={setLocation} setCoordinates={setCoordinates}>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={!isOrganizer}
                className={`
                  w-full px-3 py-2 !text-gray-900 opacity-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                  ${isOrganizer ? "border border-gray-300" : "bg-white cursor-default"}
                `}
              />
            </LocationInput>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            {isOrganizer ? <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal px-3 py-2  h-10 rounded-md shadow-sm border-gray-400",
                    !date && "text-muted-foreground" 
                  )}

                  disabled={!isOrganizer}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus required={true} />
              </PopoverContent>
            </Popover>: 
            <div className="flex items-center  bg-white p-2">
              <span>
   {date.toISOString().slice(0, 10)}
     
  </span>
            </div>
            }       
          </div>

          <div className="grid md:grid-cols-2  gap-4">
            <CustomInput
              label="Start Time"
              id="startTime"
              name="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              type="time"
              isEditable={isOrganizer}
            />

            <CustomInput
              label="End Time"
              id="endTime"
              name="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              type="time"
              isEditable={isOrganizer}
            />
          </div>
        </div>

        <div className="flex flex-row " key={updateKey}>
          {isOrganizer ? (
            <>
              {instruments.map((instrument) => (
                <label
                  // key={`${instrument}-${requiredInstrument.includes(instrument)}`}
                  // htmlFor={`instrument-${instrument}`}
                  key={instrument}
htmlFor="instrument"
                  className="mr-3 block text-sm font-medium text-gray-700 mb-1"
                >
                  {instrument}
                  <input
                    // id={`instrument-${instrument}`}
                    type="checkbox"
                    className="ml-1 form-checkbox"
                    checked={requiredInstrument.includes(instrument)}
                    onChange={() => toggleInstrument(instrument)}
                  />
                  <span className="ml-2"></span>
                </label>
              ))}
            </>
          ) : (
            <div className="bg-white p-2 ">
              <span>Instruments Needed: </span>
              {requiredInstrument.map((i: string) => (
                <span key={i} className="ml-2 ">
                  {" "}
                  {i}
                </span>
              ))}
            </div>
          )}
        </div>

        <CustomInput
          label="Event Details"
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          isEditable={isOrganizer}
        
        />

        {isOrganizer && <EventEditForm />}
      </form>
    </div>
  )
}

export default React.memo(EventInfo)