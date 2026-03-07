export default function BuscadorPacientes({ busqueda, setBusqueda }) {
    return (
        <div className="py-4">
            <input
                type="text"
                placeholder="Buscar por nombre, apellido o DNI..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="w-full border rounded px-3 py-2"
            />
        </div>
    )
}
