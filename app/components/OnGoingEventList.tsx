import Link from 'next/link'
import React from 'react'

interface Props {
    events:any,
    userId:string | null
}

const OnGoingEventList = ({events,userId}:Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
  
{events.map((event:any) => (
<div key={event.id} className="border rounded-lg p-4 shadow-md">
<h3 className="text-xl font-semibold mb-2">{event.title}</h3>
<p className="text-gray-600 mb-2">Place:{event.location}</p>
<p className="text-gray-600 mb-2">Date: {`${event?.date.getFullYear()}-${String(event?.date.getMonth()as number+1).padStart(2,"0")}-${event?.date.getDate()} : ${event?.startTime.toISOString().substring(11, 16)} - ${event?.endTime.toISOString().substring(11, 16)}`}</p>
<p className="text-gray-600 mb-4">Looking for:{event.instruments}</p>
{/* イベントの開催者が自分ならeditそうでないならjoinと表示 */}
{
 event.organizer.id===userId? 
//  後で開催予定のイベントの内容の編集または削除を行うページあるいは機能を追加する
 <Link
 href={`/event_detail/${event.id}`}
 className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-500 transition"
 >
 Edit
 </Link>
 //someは配列内の少なくとも 1つの要素が条件を満たすか を判定するメソッドです。
 : event.applications.some((app:any)=>app.userId===userId)?
 

<Link
href={`/event_detail/${event.id}`}
className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
>
Applied
</Link> :
<Link
href={`/event_detail/${event.id}`}
className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
>
Join
</Link> 
}



</div>
))}

</div>
  )
}

export default OnGoingEventList