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
import { MusicEvent } from "@/types/events";

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
            !event.applications.some((event: any) => event.userId === userId)
        )
      );
    } else if (value === "Edit") {
      setFilterredEvents(
        events.filter((event) => event.organizerId === userId)
      );
    } else if (value === "Applied") {
      setFilterredEvents(
        toJoinEvent.filter((event) =>
          event.applications.some((event: any) => event.userId === userId)
        )
      );
    } else if (value === "Latest") {
      const evetsFilteredByCreatedAt = events.sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      });

      setFilterredEvents(evetsFilteredByCreatedAt);
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
        <SelectLabel>Sort by:event's date</SelectLabel>
        <SelectItem value="Latest">Latest</SelectItem>
        <SelectItem value="Latest">Latest</SelectItem>
        
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
