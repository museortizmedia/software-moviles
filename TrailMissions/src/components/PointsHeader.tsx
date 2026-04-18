import { useApp } from "../contexts/AppContext";

export default function PointsHeader() {
  const { points, user, missions } = useApp();

  const totalMissions = Object.keys(missions).length;

  const completed =
    Object.values(missions).filter(Boolean).length;

  // LEVEL = misiones completadas
  const level = completed;

  // progress por puntos (0-100)
  const percent = (points / 100) * 100;

  const username =
    "USER-" + user?.slice(0, 4);

  return (
    <div className="px-4 mt-2">

      <div className="text-white">

        {/* HEADER */}
        <div className="flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-200 bg-clip-text text-transparent">
              Level {level}
            </h2>

            <p className="text-xs text-slate-400">
              {username}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-400">
              PROGRESS
            </p>

            <p className="font-semibold">
              {points} / 100
            </p>
          </div>

        </div>

        {/* PROGRESS */}
        <div>

          <div className="
          w-full
          h-2
          bg-slate-700
          rounded-full
          overflow-hidden
          ">

            <div
              className="
              h-2
              rounded-full
              bg-gradient-to-r
              from-green-500
              via-green-300
              to-indigo-500
              transition-all
              duration-700
              "
              style={{ width: `${percent}%` }}
            />

          </div>

        </div>

      </div>

    </div>
  );
}