import { LogOut } from "lucide-react"
import PerfilUsuario from "./PerfilUsuario"

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white flex justify-between items-center px-6 py-3 shadow">

      <h1 className="font-semibold">
        MediCare+
      </h1>

      <div className="flex items-center gap-4">

        <PerfilUsuario user={user} />

        <button
          onClick={onLogout}
          className="flex items-center gap-1 hover:text-red-200 cursor-pointer hover:scale-105"
          title='Cerrar sesión'
        >
          <LogOut size={18}/>
        </button>

      </div>

    </nav>
  )
}