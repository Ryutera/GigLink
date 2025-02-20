
import Link from 'next/link'
import React from 'react'

const EventInfo = ({event,userId}:any) => {
  return (
    <>
     {event?.organizer.id===userId? 
     
     <h2 className="text-3xl font-bold mb-6">ライブイベント {event?.title} を編集</h2>: 
     
     <h2 className="text-3xl font-bold mb-6">ライブイベント {event?.title} に応募</h2>}
   
    <div className="mb-6 p-4 bg-gray-100 rounded-md">
      <h3 className="text-xl font-semibold mb-2">イベント詳細</h3>
      <p className="mb-1">
        <strong>主催者:</strong> <Link className="hover:text-blue-400" href={`/profile/${event?.organizer.id}`}>{event?.organizer.name}</Link>
      </p>
      <p className="mb-1">
        <strong>場所:</strong> {event?.location}
      </p>
      <p className="mb-1">
        {/* リファクタリングすべきだと思う 同じコードがjoin>page.tsxにもある*/}
        <strong>日時:</strong>{`${event?.date.getFullYear()}-${String(event?.date.getMonth()as number+1).padStart(2,"0")}-${event?.date.getDate()} : ${event?.startTime.toISOString().substring(11, 16)} - ${event?.endTime.toISOString().substring(11, 16)}`}
      </p>
      <p className="mb-1">
        <strong>募集:</strong> {event?.instruments}
      </p>
    </div>
    <div className="mb-6 p-4 bg-gray-100 rounded-md">
      <h3  className="text-xl font-semibold mb-2">Description</h3>
     <p>{event?.description}</p>
    </div>
    </>
  )
}

export default EventInfo