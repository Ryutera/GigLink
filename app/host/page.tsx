
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function CreateEvent() {
 
    const {userId} = await auth()
    if (!userId) {
      alert("ユーザーが見つかりません")
    }

    const scheduledEvents = await prisma.event.findMany({
      where:{
        organizerId:userId as string,
        startTime: {
          gt: new Date(), 
        },
      }

    })

    return (
     <>
     <div  className="max-w-2xl mx-auto">
    
  {scheduledEvents?
   <div>
    <div className="flex place-content-between mb-10">
<h2>現在開催予定のイベント</h2>
<Button className="bg-blue-400">
  <Link href="">+create new event</Link></Button>
</div>
{scheduledEvents.map((scheduledEvent) => (
        <div key={scheduledEvent.id} className="border rounded-lg p-4 shadow-md">
          <h3 className="text-xl font-semibold mb-2">{scheduledEvent.title}</h3>
          <p className="text-gray-600 mb-2">Place:{scheduledEvent.location}</p>
          <p className="text-gray-600 mb-2">Date: {`${scheduledEvent.date.getFullYear()}${scheduledEvent.startTime.toISOString().substring(11, 16)} - ${scheduledEvent.endTime.toISOString().substring(11, 16)}`}</p>
         <p>
          参加希望者
         </p>

        </div>
      ))}

  </div>: <h2>現在開催予定のイベントはありません</h2> }
     </div>
     </>
    )
  }
  
  