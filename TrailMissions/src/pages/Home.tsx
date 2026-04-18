import {
  IonPage,
  IonContent
} from "@ionic/react";
import { Redirect } from "react-router-dom";

import PointsHeader from "../components/PointsHeader";
import ProgressBar from "../components/ProgressBar";
import MissionCard from "../components/MissionCard";
import { useApp } from "../contexts/AppContext";
import TopHeader from "../components/TopHeader";

export default function Home() {

  const { user } = useApp();

  if (!user) {
    return <Redirect to="/login" />;
  }

  const { missions, completeMission } = useApp();

  return (
    <IonPage>
      <IonContent fullscreen>

        <div className="min-h-screen bg-slate-950 text-white">

          <TopHeader />

          <PointsHeader />

          <ProgressBar />

          <div className="px-4 space-y-4 mt-4">

            <MissionCard
              title="Tomar foto"
              points={50}
              completed={missions.photo}
              onClick={() =>
                completeMission("photo", 50)
              }
            />

            <MissionCard
              title="Moverse 50m"
              points={30}
              completed={missions.move}
              onClick={() =>
                completeMission("move", 30)
              }
            />

            <MissionCard
              title="Mantente quieto"
              points={40}
              completed={missions.still}
              onClick={() =>
                completeMission("still", 40)
              }
            />

          </div>

        </div>

      </IonContent>
    </IonPage>
  );
}