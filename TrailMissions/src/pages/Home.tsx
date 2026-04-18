import {
  IonPage,
  IonContent
} from "@ionic/react";

import PointsHeader from "../components/PointsHeader";
import ProgressBar from "../components/ProgressBar";
import MissionCard from "../components/MissionCard";
import { useApp } from "../contexts/AppContext";

export default function Home() {
  const { missions, completeMission } = useApp();

  return (
    <IonPage>
      <IonContent fullscreen>

        <PointsHeader />

        <ProgressBar />

        <div className="p-4 space-y-4">

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

      </IonContent>
    </IonPage>
  );
}