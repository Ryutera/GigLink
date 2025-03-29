"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Application, MusicEvent } from "@/types/events";

export interface EventFilterProps {
  events: MusicEvent[];
  userId: string | null;
  setFilterredEvents: React.Dispatch<React.SetStateAction<MusicEvent[]>>;
}

const EventFilter = ({
  events,
  userId,
  setFilterredEvents,
}: EventFilterProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const toJoinEvent = events.filter((event) => event.organizerId !== userId);

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);

    if (value === "All") {
      setFilterredEvents(events);
    }
    //明日このフィルターの処理やる
    else if (value === "join") {
      // まだ応募していないイベントを抽出

      setFilterredEvents(
        toJoinEvent.filter(
          (event) =>
            !event.applications.some((event: Application) => event.userId === userId)
        )
      );
    } else if (value === "Edit") {
      setFilterredEvents(
        events.filter((event) => event.organizerId === userId)
      );
    } else if (value === "Applied") {
      setFilterredEvents(
        toJoinEvent.filter((event) =>
          event.applications.some((event:Application) => event.userId === userId)
        )
      );
    } else if (value === "Newest Posts") {
      const NewestPosts = events.sort((a, b) => {
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      });
      setFilterredEvents(NewestPosts);
    }else if (value === "Upcoming Events") {
      // sliceを挟むことでイベントの元々のデータを変更せずに済む
      const UpcomingEvents = events.slice().sort((a, b) => {
        return  a.startTime.getTime()  - b.startTime.getTime()
      });
      setFilterredEvents(UpcomingEvents);
    }
  };

  return (
    <div className="flex flex-row-reverse mb-4 ">
      <Select onValueChange={handleSelectChange} value={selectedValue}>
    
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
        <SelectGroup>
        <SelectLabel>Sort by: Event Date</SelectLabel>
        <SelectItem value="Newest Posts">Newest Posts</SelectItem>
        <SelectItem value="Upcoming Events">Upcoming Events</SelectItem>
       
        
        <SelectLabel>Sort by:event's status</SelectLabel>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="join">Join</SelectItem>
          <SelectItem value="Edit">Edit</SelectItem>
          <SelectItem value="Applied">Applied</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default EventFilter;
