import prisma from '@/lib/prisma'
import React from 'react'
import JoinForm  from "../../components/JoinForm";

import { auth } from '@clerk/nextjs/server';

import { SignUp } from '@clerk/nextjs';


export default async function Join({params}: {params:{id:string}}) {


  const event = await prisma.event.findFirst({
    where:{
id:params.id
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
    <h2 className="text-3xl font-bold mb-6">ライブイベント {event?.title} に応募</h2>
    <div className="mb-6 p-4 bg-gray-100 rounded-md">
      <h3 className="text-xl font-semibold mb-2">イベント詳細</h3>
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
    <JoinForm eventId={eventId} hasApplied={hasApplied} />
  </div>
  )
}

