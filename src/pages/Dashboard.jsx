import { useState } from "react";

import { Plus } from "lucide-react";

// Componentes Recepcionista
import BuscadorPacientes from "./Pacientes/BuscadorPacientes";
import FormularioPaciente from "./Pacientes/FormularioPaciente ";
import TablaPacientes from "./Pacientes/TablaPacientes";
import DB from "../services/DbService";

export default function Dashboard({ user }) {

    function WrapRecepcionista() {
        //logica recepcionista
        const [isOpen, setIsOpen] = useState(false)
        const [pacientes, setPacientes] = useState(DB.get('medicare_pacientes') || [])
        const [pacienteEdit, setPacienteEdit] = useState(null)

        function handleGuardar(paciente) {
            if (pacienteEdit) {
                // Reemplazamos en la posición exacta usando el _index que le pasasmos en el datatable
                const newPacientes = [...pacientes]
                newPacientes[pacienteEdit._index] = paciente

                DB.set('medicare_pacientes', newPacientes)
                setPacientes(DB.get('medicare_pacientes') || [])
                setPacienteEdit(null)
            } else {
                // Nuevo paciente
                DB.set('medicare_pacientes', [...pacientes, paciente])
                setPacientes(DB.get('medicare_pacientes') || [])
            }
        }


        function handleEliminar(index) {
            const newPacientes = pacientes.filter((_, i) => i !== index)
            DB.set('medicare_pacientes', newPacientes)
            setPacientes(DB.get('medicare_pacientes') || [])
        }

        function handleEditar(paciente) {
            setPacienteEdit(paciente)
            setIsOpen(true)
        }
        // Busqueda
        /*
        Se deja buusqueda y pacientesfiltrados acá en el padre para no tener que sincronizar datos de abajo para arriba.
        */
        const [busqueda, setBusqueda] = useState("")

        const pacientesFiltrados = pacientes.filter(p => {
            const term = busqueda.toLowerCase()
            return (
                p.nombre.toLowerCase().includes(term) ||
                p.apellido.toLowerCase().includes(term) ||
                p.dni.toLowerCase().includes(term)
            )
        })



        return <>
            <div className="block justify-items-end py-5">
                <button onClick={() => setIsOpen(true)} className="bg-green-600 text-white px-4 py-2 rounded flex flex-row gap-2 items-center">
                    <Plus className="h-5 w-5 hover:rotate-90 duration-300" />
                    Nuevo Paciente
                </button>
            </div>
            <BuscadorPacientes busqueda={busqueda} setBusqueda={setBusqueda} />
            <TablaPacientes pacientes={pacientesFiltrados} onEditar={handleEditar} onEliminar={handleEliminar} rol={user.rol} />
            <FormularioPaciente isOpen={isOpen} onClose={() => setIsOpen(false)} onGuardar={handleGuardar} pacienteAEditar={pacienteEdit} />
        </>
    }

    function WrapMedico() {
        const [pacientes, setPacientes] = useState(DB.get('medicare_pacientes') || [])

        const totalPacientes = pacientes.length
        const pacientesConNombreA = pacientes.filter(p => p.nombre.startsWith("A")).length

        return (
            <>
                <div className="py-5">
                    <h2 className="text-xl font-bold mb-4">Estadísticas de Pacientes</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Total de pacientes: {totalPacientes}</li>
                        <li>Pacientes cuyo nombre empieza con "A": {pacientesConNombreA}</li>
                    </ul>
                </div>
                <TablaPacientes pacientes={pacientes} onEditar={() => { }} onEliminar={() => { }} rol={user.rol} />
            </>
        )
    }


    return <div className="mt-[10vh] mx-10 py-10">
        <p className="uppercase pb-10 text-2xl font-bold">GESTION De {user?.rol}</p>
        {user?.rol == 'recepcionista' ? <WrapRecepcionista /> : <WrapMedico />}

    </div>
}