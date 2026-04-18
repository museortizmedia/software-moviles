import { useApp } from "../contexts/AppContext";

export default function ProgressBar() {
  const { missions } = useApp();

  const completed =
    Object.values(missions).filter(Boolean).length;

  const percent = (completed / 3) * 100;

  return (
    <div className="p-4">
      <div className="w-full bg-gray-700 rounded-full h-3">
        <div
          className="bg-green-500 h-3 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="text-sm mt-2">
        {completed} / 3 misiones
      </p>
    </div>
  );
}