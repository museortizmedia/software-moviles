import DataTable from "../../components/DataTable"
import DB from "../../services/DbService"

export default function TablaPacientes({rol, pacientes, onEditar, onEliminar}) {

    const headers = [
        ...(rol === "recepcionista"
            ? [
                {
                    label: "Acciones",
                    key: "acciones",
                    render: (row) => (
                        <div className="flex gap-2 w-25">
                            <button
                                className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                                onClick={() => onEditar(row)}
                            >
                                Editar
                            </button>
                            <button
                                className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                                onClick={() => onEliminar(row._index)}
                            >
                                Eliminar
                            </button>
                        </div>
                    )
                }
            ]
            : []),
        { label: "Nombre", key: "nombre" },
        { label: "Apellido", key: "apellido" },
        { label: "DNI", key: "dni" },
    ]

    const dataWithIndex = pacientes.map((p, i) => ({ ...p, _index: i }))

    return <DataTable headers={headers} data={dataWithIndex} rowKey={row => row._index} />

}