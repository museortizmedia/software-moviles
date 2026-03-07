import { useState } from "react"

export default function Login({logIn}) {

  const CREDENTIALS = [
    {mail: 'recepcionista@medicare.com', pws: '123456', rol: 'recepcionista', avatar: '/recepcionistaIMG.png', nombre: 'Rex Trex'},
    {mail: 'medico@medicare.com', pws: '123456', rol: 'medico', avatar: '', nombre: 'Doctor House'}
  ]

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function handleLogin(e) {
    e.preventDefault()

    if (!email || !password) {
      setError("Completa todos los campos")
      return
    }

    for (let index = 0; index < CREDENTIALS.length; index++) {
        const element = CREDENTIALS[index];
        if(email == element.mail && password == element.pws)
        {
            logIn(element);
        }

    }

    setError("Usuario o contraseña incorrectos")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow w-80"
      >

        <h2 className="text-2xl font-semibold mb-4 text-center font-mono">
          MediCare+
        </h2>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {error && (
          <p className="text-red-500 text-sm mb-2">
            {error}
          </p>
        )}

        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Ingresar
        </button>

      </form>

    </div>
  )
}