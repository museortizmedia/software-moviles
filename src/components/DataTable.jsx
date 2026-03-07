export default function DataTable({ headers = [], data = [] }) {

  function safeValue(obj, key) {
    if (!obj) return "-"
    if (!(key in obj)) return "-"
    if (obj[key] === null || obj[key] === undefined || obj[key] === "") return "-"
    return obj[key]
  }

  return (
    <div className="w-full overflow-x-auto border rounded-lg">

      <table className="min-w-full text-sm text-left">

        <thead className="bg-gray-100">
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-2 font-semibold text-gray-700"
              >
                {h.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>

          {data.length === 0 && (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-4 text-gray-400"
              >
                No hay datos
              </td>
            </tr>
          )}

          {data.map((row, i) => (
            <tr
              key={i}
              className="border-t hover:bg-gray-50"
            >
              {headers.map((h, j) => (
                <td
                  key={j}
                  className="px-4 py-2"
                >
                  {h.render ? h.render(row) : safeValue(row, h.key)}
                </td>
              ))}
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}