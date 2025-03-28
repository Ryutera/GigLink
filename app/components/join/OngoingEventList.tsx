"use client";
import Link from "next/link";
import { useState } from "react";
import EventsFilter from "./EventsFilter";
import { MusicEvent } from "@/types/events";

export interface EventListProps {
  events: MusicEvent[] ;
  userId: string | null
}

const OngoingEventList = ({ events, userId }: EventListProps ) => {
  const [filteredEvents, setFilteredEvents] = useState(events);

  return (
    < >
       <div className="flex justify-end w-full">
        <EventsFilter events={events} userId={userId} setFilterredEvents={setFilteredEvents} />
      </div>
      {filteredEvents.length > 0 && (
        // イベントがあるときだけ grid を適用
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="border rounded-lg p-4 shadow-md">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-2">Place: {event.location}</p>
              <p className="text-gray-600 mb-2">
                Date:{" "}
                {`${event?.date.getFullYear()}-${String(
                  (event?.date.getMonth() as number) + 1
                ).padStart(2, "0")}-${event?.date.getDate()} : ${event?.startTime
                  .toISOString()
                  .substring(11, 16)} - ${event?.endTime
                  .toISOString()
                  .substring(11, 16)}`}
              </p>
              <p className="text-gray-600 mb-4">
                Looking for: {event.instruments.join(", ")}
              </p>

              {/* イベントの開催者が自分なら Edit、そうでないなら Join を表示 */}
              {event.organizer?.id === userId ? (
                <Link
                  href={`/event_detail/${event.id}`}
                  className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-500 transition"
                >
                  Edit
                </Link>
              ) : event.applications?.some((app:any) => app.userId === userId) ? (
                <Link
                  href={`/event_detail/${event.id}`}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                >
                  Applied
                </Link>
              ) : (
                <Link
                  href={`/event_detail/${event.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Join
                </Link>
              )}
            </div>
          ))}
        </div>
      ) }
    </>
  );
};

export default OngoingEventList;
