import Link from "next/link"
import Login from "./Login"
import { currentUser } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"


const Header = async () => {
    const user = await currentUser()

    const userInfo = await prisma.user.findFirst({
        where:{
            id:user?.id,
        }
    })

    const username = userInfo?.name


  return (
    <header className="h-[80px] bg-blue-400  flex justify-between items-center px-7 mb-7">
        <div>
<h1 className="text-white text-3xl font-bold">
    <Link href="/"> Gig Link</Link>
   
    </h1>
        </div>

<div className="flex gap-20">
<div>
    <p className="text-white text-xl font-bold">Apply</p>
</div>
<div>
    <p className="text-white text-xl font-bold">Join</p>
</div>
<div>
    <Link href={`/profile/${username}`}>
    <p className="text-white text-xl font-bold">Profile</p>
    </Link>
</div>
</div>

        <div>
            <Login/>
        </div>
    </header>
  )
}

export default Header