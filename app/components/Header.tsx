import Login from "./Login"


const Header = () => {



  return (
    <header className="h-10 bg-red-50 flex justify-between">
        <div>
<h1>GigLink</h1>
        </div>
        <div>
            <Login/>
        </div>
    </header>
  )
}

export default Header