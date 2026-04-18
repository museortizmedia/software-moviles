import { IonCard, IonButton } from "@ionic/react";

export default function MissionCard({
  title,
  points,
  completed,
  onClick
}: any) {
  return (
    <IonCard className="p-4">
      <div className="flex justify-between">
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="text-sm opacity-70">
            {points} pts
          </p>
        </div>

        {completed ? (
          <span className="text-green-400">
            Completed
          </span>
        ) : (
          <IonButton onClick={onClick}>
            Start
          </IonButton>
        )}
      </div>
    </IonCard>
  );
}