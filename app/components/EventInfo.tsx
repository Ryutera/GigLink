"use client";

import Link from "next/link";
import type React from "react";
import { useEffect, useState } from "react";
import { instruments } from "../constants/instruments";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ProfileForm from "./ProfileForm";

import { eventDeleteAction, eventEditAction } from "@/lib/action";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { Span } from "next/dist/trace";
import EventEditForm from "./EventEditForm";
import CustomInput from "./CustomInput";
import LocationInput from "./LocationInput";

const EventInfo = ({ event, userId, onSubmit }: any) => {
  const [title, setTitle] = useState(event?.title);
  const [description, setDescription] = useState(event?.description);
  const [requiredInstrument, setRequiredInstrument] = useState(
    event?.instruments || []
  );
  const [date, setDate] = useState(event?.date.toISOString());
  const [startTime, setStartTime] = useState(
    event?.startTime.toISOString().substring(11, 16)
  );
  const [endTime, setEndTime] = useState(
    event?.endTime.toISOString().substring(11, 16)
  );
  const [location, setLocation] = useState(event?.location);

  const router = useRouter();
  const isOrganizer = event?.organizer.id === userId;
  const eventId = event.id;

  //一瞬値がちらつく

  useEffect(() => {
    console.log("🔄 useEffect: router.refresh() 実行");
    // router.refresh(); // 強制的にデータを更新
  }, [requiredInstrument]);

  const handleSubmit = async (formData: FormData) => {
    const action = formData.get("action");

    const editData = {
      title,
      description,
      date, // YYYY-MM-DD 形式
      startTime,
      endTime,
      location,
      instruments: requiredInstrument,
    };

    if (action === "delete") {
      if (window.confirm("本当にこのイベントを削除しますか？")) {
        const result = await eventDeleteAction(eventId);
        if (result.success) {
        } else {
          alert(result.message);
        }
      }
    } else {
      // 編集の処理

      const result = await eventEditAction({ eventId, editData });
      if (result.success) {
        // router.refresh();
        alert(result.message);
      } else {
        alert(result.message);
      }
    }
  };

  const toggleInstrument = (instrument: string) => {
    setRequiredInstrument((prev: any) =>
      prev.includes(instrument)
        ? prev.filter((i: string) => i !== instrument)
        : [...prev, instrument]
    );
  };



  return (
    <div className="space-y-5 w-full mb-8">
      <h2 className="text-3xl font-bold">
        {isOrganizer
          ? `ライブイベント ${event.title} を編集`
          : `ライブイベント ${event.title} の詳細`}
      </h2>

      <form action={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CustomInput
            label="イベントタイトル"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            isEditable={isOrganizer}
          />

         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              場所
            </label>
           
            <LocationInput setPlace={setLocation}>
            <input
             value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={!isOrganizer}
              className={`
                "grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500",
                ${!isOrganizer && "bg-white cursor-default"}
              )`}
            />
            </LocationInput>
            
          </div>
          

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              日付
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal px-3 py-2 rounded-md shadow-sm border-gray-400 h-10",
                    !date && "text-muted-foreground"
                  )}
                  disabled={!isOrganizer}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>日付を選択</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CustomInput
              label="開始時間"
              id="startTime"
              name="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              type="time"
              isEditable={isOrganizer}
            />

            <CustomInput
              label="終了時間"
              id="endTime"
              name="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              type="time"
              isEditable={isOrganizer}
            />
          </div>
        </div>

        <div className="flex flex-row ">
          {isOrganizer ? (
            <>
              {instruments.map((instrument) => (
                <label
                  key={instrument}
                  htmlFor="instrument"
                  className="mr-3 block text-sm font-medium text-gray-700 mb-1"
                >
                  {instrument}

                  <input
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
            <>
              <span>募集楽器: </span>
              {requiredInstrument.map((i: string) => (
                <span key={i} className="ml-2">
                  {" "}
                  {i}
                </span>
              ))}
            </>
          )}

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

        <CustomInput
          label="イベント詳細"
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
  );
};

export default EventInfo;
