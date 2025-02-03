import Login from "./Login"


const Header = () => {



  return (
    <header className="h-[80px] bg-blue-400  flex justify-between items-center px-7 mb-7">
        <div>
<h1 className="text-white text-3xl font-bold">Gig Link</h1>
        </div>
        <div>
            <Login/>
        </div>
    </header>
  )
}

export default Header