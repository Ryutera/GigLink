
import ProfileForm from '@/app/components/ProfileForm'
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
     
    },include:{
      event:true
    }
   }
  )


  return (
  <div className="flex  justify-center w-full">
  <Tabs defaultValue="account">
    {userId===paramsUserID&&<TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="appStatus">Application Status</TabsTrigger>
  </TabsList>}
  
  <TabsContent value="account"><ProfileForm user={userInfo} userId={userId} /></TabsContent>
  <ApplicationStatus schedules={schedules}/>
</Tabs>
</div>
  
  
    
  )
}

export default ProfilePage