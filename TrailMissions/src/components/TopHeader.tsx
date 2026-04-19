import { useApp } from "../contexts/AppContext";
import { useHistory } from "react-router";
import { LogOut } from "lucide-react";

export default function TopHeader() {
  const { user, points, logoutUser } = useApp();
  const history = useHistory();

  if (!user) return null;

  const username = "USER-" + user.substring(0, 4);

  const handleLogout = async () => {
    await logoutUser();
    history.replace("/login");
  };

  return (
    <div className="px-4 pt-2">

      <div className="
      flex
      justify-between
      items-center
      ">

        {/* LEFT */}
        <div className="flex items-center gap-3">

          <img
            src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user}`}
            className="w-8 h-8 rounded-full bg-slate-800"
          />

          <p className="text-sm font-semibold text-white">
            {username}
          </p>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* POINTS */}
          <div className="
          bg-slate-800
          px-3
          py-1
          rounded-full
          flex
          items-center
          gap-2
          text-sm
          ">

            <span className="text-yellow-400">
              ●
            </span>

            <span className="text-white">
              {points} pts
            </span>

          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="
            w-9
            h-9
            rounded-full
            flex
            items-center
            justify-center
            bg-slate-800
            hover:bg-red-500/20
            transition
            "
          >
            <LogOut
              size={16}
              className="text-slate-300"
            />
          </button>

        </div>

      </div>

    </div>
  );
}