import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EventCard } from "../components/EventCard";

export default async function CreateEvent() {
  const { userId } = await auth();
  if (!userId) {
    return <div>ユーザーが見つかりません</div>;
  }

  const scheduledEvents = await prisma.event.findMany({
    where: {
      organizerId: userId as string,
      startTime: {
        gt: new Date(),
      },
    },
    include: {
      applications: {
        where: {
          status: 'PENDING'
        },
        include: {
          user: true,
     
        },
      },
    },
  });



  const eventsWithParticipants = await Promise.all(

    scheduledEvents.map(async (event)=>{
const participants =  await prisma.application.findMany({
  where: { eventId: event.id, status: "ACCEPTED" },
  select: { user: true },
});

return participants.map((p)=>p.user.name)
    })
    
  )
console.log(eventsWithParticipants)

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">あなたが主催予定のイベント</h1>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Link href="/create_event">+ 新規イベント作成</Link>
        </Button>
      </div>

      {scheduledEvents ? (
        <div className="space-y-6">
          {scheduledEvents.map((event) => (
            
            <EventCard key={event.id} event={event} participants={eventsWithParticipants }/>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-600">現在開催予定のイベントはありません</h2>
        </div>
      )}
    </div>
  );
}

