"use client"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { revalidatePath } from "next/cache";

interface Props{
    events:any;
    userId:string|null
     setFilterredEvents:any
}

const EventFilter = ({events,userId, setFilterredEvents}:Props) => {
  const [selectedValue, setSelectedValue] = useState<string>("")


  const toJoinEvent = events.filter((event:any)=>event.organizerId!==userId)

  const handleSelectChange = (value: string) => {
    setSelectedValue(value)
    console.log("選択された値:", value)
    if (value==="All") {
      setFilterredEvents(events)
    }
//明日このフィルターの処理やる
    else if (value === "join") {
       // まだ応募していないイベントを抽出

    setFilterredEvents(toJoinEvent.filter((event:any)=>!event.applications.some((event:any)=>event.userId===userId)))
  
         
   
    } else if (value === "Edit") {
         setFilterredEvents( events.filter((event:any)=>event.organizerId===userId)) 
   
   
    } else if (value === "Applied") {
      setFilterredEvents(toJoinEvent.filter((event:any)=>event.applications.some((event:any)=>event.userId===userId)))

    }
  }

  return (
    <div className="flex flex-row-reverse mb-4">
      <div className="flex items-center gap-2">
        
        <Select onValueChange={handleSelectChange} value={selectedValue}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="join">Join</SelectItem>
            <SelectItem value="Edit">Edit</SelectItem>
            <SelectItem value="Applied">Applied</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default EventFilter

