import Link from "next/link"
import Login from "./Login"




const Header = async () => {
    


  return (
    <header className='h-[80px] bg-blue-400  flex justify-between items-center px-7 mb-7'>
        <div>
<h1 className="text-white text-3xl font-bold">
    <Link href="/"> Gig Link</Link>
   
    </h1>
        </div>

{/* <div className="flex gap-20">
<div>
    <Link href="/host">
    <p className="text-white text-xl font-bold">Host</p>
    </Link>
</div>
<div>
    <Link href="/join">
    <p className="text-white text-xl font-bold">Join</p>
    </Link>
</div>
<div>
    <Link href="">
    <p className="text-white text-xl font-bold">Manage Account</p>
    </Link>
</div>
</div> */}

        <div>
            <Login/>
        </div>
    </header>
  )
}

export default Header