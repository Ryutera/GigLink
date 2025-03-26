import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Login = () => {
  return (
    <div>
      <SignedOut>
        <Button>
          <Link href="/sign-in" className="font-black text-black">
            Login
          </Link>
        </Button>
      </SignedOut>
      
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Login;
