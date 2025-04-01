
import { UserCircle, Users } from "lucide-react";
import { Home } from 'lucide-react';
import { auth } from "@clerk/nextjs/server"
import NavCard from "./components/NavCard";



export default async function TopPage() {

    
      const { userId } = await auth()

  
  return (
 

  <div className="flex flex-col items-center justify-center min-h-[85vh]">
  <h1 className="md:text-4xl text-3xl font-bold text-indigo-800 mb-12 ">Music Starts Here</h1>
  <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-stretch justify-center w-full max-w-5xl">
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
      
      link={`/profile/${userId}`}
     
    />
  </div>
</div>
)
  
   
}



