
import { UserCircle, Users } from "lucide-react";

import NavCard from "./components/NavCard";


export default async function Home() {



  return (
  

  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
  <h1 className="text-4xl font-bold text-indigo-800 mb-12">Welcome to Our Service</h1>
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
      link="/profile"
    />
  </div>
</div>
)
}



