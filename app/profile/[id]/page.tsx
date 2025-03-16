import ProfileForm from "@/app/components/profile/ProfileForm"
import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ApplicationStatus from "@/app/components/ApplicationStatus"
import BackButton from "@/app/components/BackButton"

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { userId } = await auth()

  const paramsUserID = id

  if (!userId) {
    redirect("/sign-up")
  }

  const userInfo = await prisma.user.findUnique({
    where: {
      id: paramsUserID,
    },
  })

  if (!userInfo) {
    return
  }
  console.log(paramsUserID, userId)

  const schedules = await prisma.application.findMany({
    where: {
      userId: userId,
      event: {
        startTime: {
          gt: new Date(),
        },
      },
    },
    include: {
      event: true,
    },
  })

  const organizedEvents = await prisma.event.findMany({
    where: { organizerId: userInfo.id },
  })

  const applications = await prisma.application.findMany({
    where: { userId: userInfo.id },
  })

  return (
    <div className="flex items-center justify-center w-full p-7 ">
      <Tabs defaultValue="account" className="w-full max-w-2xl">
        {userId === paramsUserID && (
          <div className="flex justify-center w-full mb-8">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="appStatus">Application Status</TabsTrigger>
            </TabsList>
          </div>
        )}

        <TabsContent value="account">
          <ProfileForm user={userInfo} userId={userId} organizedEvents={organizedEvents} applications={applications} />
        </TabsContent>
        <TabsContent value="appStatus">
          <ApplicationStatus schedules={schedules} />
        </TabsContent>
        <BackButton />
      </Tabs>
    </div>
  )
}

