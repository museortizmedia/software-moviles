import { IonLoading } from "@ionic/react";

interface Props {
  isOpen: boolean;
  message?: string;
}

export default function FullScreenLoader({
  isOpen,
  message = "Cargando..."
}: Props) {
  return (
    <IonLoading
      isOpen={isOpen}
      message={message}
      spinner="crescent"
    />
  );
}