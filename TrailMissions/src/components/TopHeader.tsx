import { useApp } from "../contexts/AppContext";
import { useHistory } from "react-router";
import { LogOut } from "lucide-react";

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
    <div>

      <div className="
      rounded-2xl
      px-4
      flex
      justify-between
      items-center
      shadow-lg
      ">

        {/* LEFT */}
        <div className="flex items-center gap-3">

          <img
            src="https://i.pravatar.cc/100?img=3"
            className="w-6 h-6 rounded-full"
          />

          <div className="text-xl">
            <p>{username}</p>
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
            className="bg-transparent text-red-400 hover:text-red-400"
          >
            <LogOut size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}