import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EventCard } from "../components/EventCard";

export default async function CreateEvent() {
  const { userId } = await auth();
  if (!userId) {
    return <div>
      <div className="md:flex justify-between align-items items-center mb-8 block">
        <h1 className="text-3xl font-bold ">主催予定のイベントはありません</h1>
        <Button className="bg-blue-500 hover:bg-blue-600 md:block hidden">
          <Link href="/create_event">+ 新規イベント作成</Link>
        </Button>
      </div>

<Button className="fixed 
    bottom-6 
    left-1/2 
    -translate-x-1/2 
    bg-blue-500 
    hover:bg-blue-600 
    md:hidden 
    rounded-full 
    w-12 
    h-12 
    flex 
    items-center 
    justify-center 
    shadow-lg 
    z-50">
          <Link href="/create_event">+</Link>
        </Button>

    </div>;
  }

  //ログイン中のアカウントが開催予定のイベント
  const scheduledEvents = await prisma.event.findMany({
    where: {
      organizerId: userId as string,
      startTime: {
        gt: new Date(),
      },
    },
    include: {
      applications:{
        include:{
          user:true
        }
      }
      
     
    },

  });


console.log(scheduledEvents)
console.log(scheduledEvents.map((e)=>e.applications))



// const eventsWithParticipants = await Promise.all(

//   scheduledEvents.map(async (event)=>{
// const participants =  await prisma.application.findMany({
// where: { eventId: event.id, status: "ACCEPTED" },
// select: { user: true },
// });

// return participants.map((p)=>p.user.name)
//   })
  
// )

  
// console.log(eventsWithParticipants)

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="md:flex justify-between items-center mb-8 block">
        <h1 className="text-3xl font-bold ">あなたが主催予定のイベント</h1>
        <Button className="bg-blue-500 hover:bg-blue-600 md:block hidden">
          <Link href="/create_event">+ 新規イベント作成</Link>
        </Button>
      </div>

      {scheduledEvents.length ? (
        <div className="space-y-6">
          {scheduledEvents.map((event) => (
            
            <EventCard key={event.id} event={event}/>
          
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-100 rounded-lg mt-5 flex ">
          <h2 className="text-xl font-semibold text-gray-600">現在開催予定のイベントはありません</h2>
        </div>
      )}

<Button className="fixed 
    bottom-6 
    left-1/2 
    -translate-x-1/2 
    bg-blue-500 
    hover:bg-blue-600 
    md:hidden 
    rounded-full 
    w-12 
    h-12 
    flex 
    items-center 
    justify-center 
    shadow-lg 
    z-50">
          <Link href="/create_event">+</Link>
        </Button>
    </div>
  );
}

