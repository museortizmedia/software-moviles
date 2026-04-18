import { IonPage, IonContent } from "@ionic/react";
import { useApp } from "../contexts/AppContext";

export default function Results() {
  const { points, missions } = useApp();

  return (
    <IonPage>
      <IonContent>

        <div className="p-6 text-center">

          <h1 className="text-3xl font-bold">
            Results
          </h1>

          <p className="text-xl mt-4">
            {points} Points
          </p>

          <p className="mt-2">
            Completed:
            {Object.values(missions).filter(Boolean).length}
          </p>

        </div>

      </IonContent>
    </IonPage>
  );
}