import React from 'react'
import HostForm from '../components/HostForm'
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const createNewEvent = async() => {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-up')
  }
  return (
    <HostForm/>
  )
}

export default createNewEvent