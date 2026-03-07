import { useState, useEffect } from "react"

export default function FormularioPaciente({ isOpen, onClose, onGuardar, pacienteAEditar }) {

// Form
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [dni, setDni] = useState("")
  // error
  const [error, setError] = useState("")

  // Si viene un paciente para editar, precargamos los campos
  useEffect(() => {
    if (pacienteAEditar) {
      setNombre(pacienteAEditar.nombre || "")
      setApellido(pacienteAEditar.apellido || "")
      setDni(pacienteAEditar.dni || "")
    } else {
      setNombre("")
      setApellido("")
      setDni("")
    }
    setError("")
  }, [pacienteAEditar, isOpen])

  if (!isOpen) return null // No renderiza nada si está cerrado

  function handleSubmit(e) {
    e.preventDefault()

    if (!nombre || !apellido || !dni) {
      setError("Nombre, apellido y DNI son obligatorios")
      return
    }

    const dniCount = dni.toString().length;

    if (dniCount < 7 ) {
      setError("El DNI debe tener al menos 7 números")
      return
    }

    if ( dniCount > 8) {
      setError("El DNI no debe tener más de 8 números")
      return
    }

    setError("")
    const paciente = { nombre, apellido, dni }

    onGuardar(paciente)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4 text-center">
          {pacienteAEditar ? "Editar Paciente" : "Nuevo Paciente"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={e => setApellido(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="DNI"
            value={dni}
            onChange={e => setDni(e.target.value)}
            className="w-full border p-2 rounded"
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button className="bg-blue-600 text-white py-2 rounded mt-2">
            Guardar
          </button>
        </form>
      </div>
    </div>
  )
}