import { IonCard } from "@ionic/react";
import { useApp } from "../contexts/AppContext";

export default function PointsHeader() {
  const { points } = useApp();

  return (
    <IonCard className="p-4 flex justify-between items-center">
      <div>
        <p className="text-sm opacity-70">Total Points</p>
        <h1 className="text-2xl font-bold">{points}</h1>
      </div>

      <div className="bg-indigo-500 text-white px-3 py-1 rounded-full">
        XP
      </div>
    </IonCard>
  );
}