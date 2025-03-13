
import prisma from '@/lib/prisma'
import React from 'react'
import JoinForm  from "../../components/JoinForm";
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import EventInfo from '@/app/components/EventInfo';
import EventEditForm from '@/app/components/EventEditForm';
import { cache } from "react";

export default async function eventDetail({params}: {params:{id:string}}) {

  const { id } = await Promise.resolve(params)

  const {userId} = await auth()
  if (!userId) {
    return <div>ユーザーが見つかりません</div>
  }
  
   const event = await prisma.event.findFirst({
    where:{
id:id
    },
    include:{

      organizer:{
        select:{
          name:true,
          id:true
        }
      }
    }
  })
  
 
  if (!event) {
  return <div className=''>イベントがありません</div>
   
  }

    
  
    const hasApplied = await prisma.application.findMany(
      {
        where:{
          eventId:id,
          userId:userId
        }
      }
    )
    

  return (
    <div className="max-w-2xl mx-auto p-7">
    <EventInfo event={event} userId={userId}/>
    {event?.organizer.id===userId || <JoinForm eventId={id}  hasApplied={hasApplied} userId={userId}/>}
    
  </div>
  )
}

