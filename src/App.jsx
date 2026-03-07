import { useState } from "react"
import DB from "./services/DbService"
import Navbar from "./components/navbar"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"

export default function App() {

    const [sesion, setSession] = useState(DB.get('sesion'));

    const LogIn = (user) => {
        DB.set('sesion', user)
        setSession(user);
    }

    const LogOut = () => {
        DB.delete('sesion')
        setSession(null);
    }

    if (sesion) {
        return <>
            <Navbar user={sesion} onLogout={LogOut} />
            <Dashboard user={sesion} />
        </>
    }

    return <Login logIn={LogIn} />
}