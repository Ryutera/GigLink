import ProfileForm from '@/app/components/ProfileForm'
import prisma from '@/lib/prisma'
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'


const ProfilePage = async () => {
  const {userId} = await auth()

  if (!userId) {
    redirect('/sign-up')
  }

  const userInfo = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!userInfo) {
    return
  }


  return <ProfileForm user={userInfo} />
}

export default ProfilePage