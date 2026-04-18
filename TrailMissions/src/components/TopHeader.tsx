import { useApp } from "../contexts/AppContext";
import { useHistory } from "react-router";

export default function TopHeader() {
  const { user } = useApp();
  const { points, logoutUser } = useApp();
  const history = useHistory();

  const username = "USER-" + user?.substring(0,4);

  const handleLogout = async () => {
    await logoutUser();
    history.replace("/login");
  };

  return (
    <div className="p-4">

      <div className="
      bg-gradient-to-r
      from-[#071326]
      to-[#0b1c3a]
      rounded-2xl
      p-4
      flex
      justify-between
      items-center
      shadow-lg
      ">

        {/* LEFT */}
        <div className="flex items-center gap-3">

          <img
            src="https://i.pravatar.cc/100?img=3"
            className="w-10 h-10 rounded-full"
          />

          <div>
            <h2>{username}</h2>
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          <div className="
          bg-slate-700
          px-4
          py-2
          rounded-full
          flex
          items-center
          gap-2
          ">

            <span className="text-yellow-400">
              ●
            </span>

            <span className="text-white">
              {points} pts
            </span>

          </div>

          <button
            onClick={handleLogout}
            className="
            text-xs
            text-red-400
            "
          >
            logout
          </button>

        </div>

      </div>

    </div>
  );
}