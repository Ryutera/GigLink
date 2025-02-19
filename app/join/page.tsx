import prisma from '@/lib/prisma'
import Link from 'next/link'
import React from 'react'

const Join = async() => {

const events = await prisma.event.findMany({
where: {
startTime: {
gt: new Date(), // 現在の日時より後のイベントのみ取得
},
},
orderBy:[{
startTime:"asc"
}]
})



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
<Link
href={`/event_detail/${event.id}`}
className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
>
Join
</Link>
</div>
))}
</div>
</div>
)
}

export default Join