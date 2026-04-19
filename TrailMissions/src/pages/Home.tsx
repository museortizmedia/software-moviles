import { IonPage, IonContent } from "@ionic/react";
import { Redirect } from "react-router-dom";
import { useState } from "react";

import PointsHeader from "../components/PointsHeader";
import MissionCard from "../components/MissionCard";
import TopHeader from "../components/TopHeader";
import RankingCard from "../components/RankingCard";

import { useApp } from "../contexts/AppContext";
import { useMissions } from "../hooks/useMissions";

export default function Home() {
  const { user, missions, completeMission } = useApp();
  const [filter, setFilter] = useState<string | null>(null);

  if (!user) {
    return <Redirect to="/login" />;
  }

  const missionsList = [
    { id: "photo", title: "Tomar foto", points: 33 },
    { id: "move", title: "Moverse 50m", points: 33 },
    { id: "still", title: "Mantente quieto", points: 34 }
  ];

  const {
    takePhotoMission,
    trackMovement,
    waitAndVibrate
  } = useMissions(completeMission);

  const filtered = filter
    ? missionsList.filter((m) => m.id === filter)
    : missionsList;

  const runMission = (id: string) => {
    if (id === "photo") takePhotoMission();
    if (id === "move") trackMovement();
    if (id === "still") waitAndVibrate();
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="min-h-screen bg-slate-950 text-white pb-10">

          <TopHeader />
          <PointsHeader />
          <RankingCard />

          {/* FILTER */}
          <div className="px-4 mt-6">

            <div className="flex justify-between items-center mb-3">

              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
                Active Missions
              </h3>

              <div className="flex gap-2">
                {["photo", "move", "still"].map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setFilter(filter === type ? null : type)
                    }
                    className={`
                    px-3 py-1 rounded-full text-xs capitalize transition
                    ${
                      filter === type
                        ? "bg-indigo-500 text-white"
                        : "bg-slate-800 text-slate-400"
                    }
                    `}
                  >
                    {type}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* MISSIONS */}
          <div className="px-4 space-y-4 mt-4">

            {filtered.map((m) => (
              <MissionCard
                key={m.id}
                title={m.title}
                points={m.points}
                type={m.id}
                completed={missions[m.id]}
                onClick={() => runMission(m.id)}
              />
            ))}

          </div>

        </div>
      </IonContent>
    </IonPage>
  );
}