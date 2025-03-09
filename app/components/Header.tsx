import Link from "next/link";
import Login from "./Login";

const Header = async () => {
  return (
    <header className="h-[80px]  bg-blue-400  flex justify-between items-center px-7 mb-7">
      <div>
        <h1 className="text-white md:text-3xl text-2xl font-bold">
          <Link href="/"> Gig Link</Link>
        </h1>
      </div>

      <div>
        <Login />
      </div>
    </header>
  );
};

export default Header;
