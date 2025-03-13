
import ProfileForm from '@/app/components/profile/ProfileForm'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ApplicationStatus from '@/app/components/ApplicationStatus'




const ProfilePage = async ({params}:{params:{id:string}}) => {
  const {userId} = await auth()

  const {id} = await params
  const paramsUserID = id

    
  if (!userId) {
    redirect('/sign-up')
  }
  const userInfo = await prisma.user.findUnique({
    where: {
      id: paramsUserID
    },
  })

  if (!userInfo) {
    return
  }
  console.log( paramsUserID, userId)

  const schedules = await prisma.application.findMany(
   {
    where:{
      userId:userId,
      event: {
        startTime: {
          gt: new Date()
        },
      },
     
    },include:{
      event:true
      
    }
   }
  )


  return (
  <div className="flex  justify-center w-full p-7">
  <Tabs defaultValue="account" className="w-full max-w-2xl">
    {
  
    userId===paramsUserID&&
    
    <TabsList className="mb-4">
    
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="appStatus">Application Status</TabsTrigger>
    
  </TabsList>}
  
  <TabsContent value="account" ><ProfileForm user={userInfo} userId={userId} /></TabsContent>
  <TabsContent value="appStatus" ><ApplicationStatus schedules={schedules}/></TabsContent>
</Tabs>
</div>
  
  
    
  )
}

export default ProfilePage