
import ProfileForm from '@/app/components/ProfileForm'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'



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


  return (
  <>
  <ProfileForm user={userInfo} userId={userId} />
  
    </>
  )
}

export default ProfilePage