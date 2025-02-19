import { TabsContent } from '@radix-ui/react-tabs'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Link from 'next/link'
  

const ApplicationStatus = ({schedules}:{schedules:any}) => {
  return (
    <>
    <TabsContent value="appStatus">
    <div className="max-w-2xl mx-auto">
    <h2 className="text-3xl font-bold mb-6 mt-5">Application Status</h2>

<Table>
 
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Status</TableHead>
      <TableHead className="text-center">Title</TableHead>
      <TableHead className="text-center">StartTime</TableHead>
      {/* <TableHead className="text-center">Amount</TableHead> */}
    </TableRow>
  </TableHeader>
  <TableBody>
 
    <TableRow>
    {schedules.map((s:any)=>
    <>
     <TableCell className={`font-medium ${s.status==="ACCEPTED"?"text-green-500":"text-gray-500"}`}>{s.status}</TableCell>
     <TableCell>
        <Link href={`/join/${s.event.id}`} className='hover:text-blue-300'>
        {s.event.title}
        </Link>
        
        </TableCell>
     <TableCell> {String(s.event.startTime.toISOString().substring(0,10))}</TableCell>
     </>
    )}
     
    </TableRow>
  </TableBody>
</Table>

    </div>

    </TabsContent>
    </>
  )
}

export default ApplicationStatus