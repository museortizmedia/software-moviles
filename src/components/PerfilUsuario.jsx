export default function PerfilUsuario({ user }) {

  const initials = (user?.nombre || '')
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="flex items-center gap-2">

      {user?.avatar ? (
        <img
          src={user.avatar}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
          title='que buscas aqui? '
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center text-sm font-semibold">
          {initials}
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-sm">
          {user.nombre || 'Sin nombre'}
        </span>
        <span className="text-[10px] font-mono">
          rol: {user.rol || 'Sin nombre'}
        </span>
      </div>

    </div>
  )
}