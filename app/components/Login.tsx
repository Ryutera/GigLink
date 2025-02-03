
import { Button } from "@/components/ui/button";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
  } from "@clerk/nextjs";
import Link from "next/link";


const Login = () => {
    
  return (
    <div>
<SignedOut>
<Button>
    <Link href="/sign-in">Login</Link></Button>

        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
    </div>
  )
}

export default Login