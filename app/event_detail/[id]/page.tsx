import prisma from "@/lib/prisma"
import JoinForm from "../../components/JoinForm"
import { auth } from "@clerk/nextjs/server"
import EventInfo from "@/app/components/EventInfo"
import BackButton from "@/app/components/BackButton"
import Redirect from "@/app/components/Redirect"

export default async function EventDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { userId } = await auth()
  if (!userId) {
    return <Redirect/>
  }

  const event = await prisma.event.findFirst({
    where: {
      id: id,
    },
    include: {
      organizer: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  })

  if (!event) {
    return <div className="">No events</div>
  }

  const hasApplied = await prisma.application.findMany({
    where: {
      eventId: id,
      userId: userId,
    },
  })

  return (
    <div className="max-w-2xl mx-auto p-7 rounded-lg shadow-md">
      <EventInfo event={event} userId={userId} />
      {event?.organizer.id === userId || <JoinForm eventId={id} hasApplied={hasApplied} userId={userId} />}
      <BackButton />
    </div>
  )
}

