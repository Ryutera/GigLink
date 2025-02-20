import prisma from '@/lib/prisma'
import React from 'react'
import JoinForm  from "../../components/JoinForm";
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import EventInfo from '@/app/components/EventInfo';
import EventEditForm from '@/app/components/EventEditForm';


export default async function eventDetail({params}: {params:{id:string}}) {


  const event = await prisma.event.findFirst({
    where:{
id:params.id
    },include:{
      organizer:{
        select:{
          name:true,
          id:true
        }
      }
    }
  })
  if (!event) {
    alert("there is no event")
   
  }

    const {userId} = await auth()
    if (!userId) {
      return <div>ユーザーが見つかりません</div>
    }
  
    const hasApplied = await prisma.application.findMany(
      {
        where:{
          eventId:params.id,
          userId:userId
        }
      }
    )
    
  

  const eventId = params.id


  return (
    <div className="max-w-2xl mx-auto">
    <EventInfo event={event} userId={userId}/>
    {event?.organizer.id===userId?
    <EventEditForm/> :
     <JoinForm eventId={eventId} hasApplied={hasApplied} />}
    
  </div>
  )
}

