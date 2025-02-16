
import { UserCircle, Users } from "lucide-react";
import { Home } from 'lucide-react';
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"
import NavCard from "./components/NavCard";



export default async function TopPage() {
  const { userId } = await auth()
  let username = null

  if (userId) {
    const userInfo = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    })
    username = userInfo?.name
  }

  return (
  

  <div className="flex flex-col items-center justify-center min-h-screen mt-[-50px] ">
  <h1 className="text-4xl font-bold text-indigo-800 mb-12 ">Welcome to Our Service</h1>
  <div className="flex flex-row gap-8 items-stretch justify-center w-full max-w-5xl">
    <NavCard
      title="Host an Event"
      icon={Home}
      description="Create and manage your own events"
      bgColor="bg-indigo-200"
      hoverColor="hover:bg-indigo-300"
      link="/host"
    />
    <NavCard
      title="Join an Event"
      icon={Users}
      description="Find and participate in exciting events"
      bgColor="bg-purple-200"
      hoverColor="hover:bg-purple-300"
      link="/join"
    />
    <NavCard
      title="Your Profile"
      icon={UserCircle}
      description="Manage your account and preferences"
      bgColor="bg-green-200"
      hoverColor="hover:bg-green-300"
      link={username ? `/profile/${username}` : "/sign-in"}
     
    />
  </div>
</div>
)
}



