import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

const Join = async() => {

const {userId} = await auth()

const events = await prisma.event.findMany({
where: {
startTime: {
gt: new Date(), // 現在の日時より後のイベントのみ取得
},
},include:{
    organizer :true,
    applications:true,
    
   
},
orderBy:[{
startTime:"asc"
}]
})

console.log(events[0].applications.map((a)=>a))

return (
<div className="space-y-8 mx-8">
<h2 className="text-3xl font-bold text-center">Ongaing Event</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  
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
</div>
)
}

export default Join