import React from "react";
import { IonItem, IonLabel, IonInput } from "@ionic/react";

interface Props {
  label: string;
  type?: string;
  value?: any;
  onChange?: (e: any) => void;
  [key: string]: any;
}

export default function CommonInput({
  label,
  type = "text",
  value,
  onChange,
  ...props
}: Props) {
  return (
    <IonItem>
      <IonLabel position="stacked">{label}</IonLabel>
      <IonInput
        type={type}
        value={value}
        onIonChange={(e) => onChange?.(e)}
        {...props}
      />
    </IonItem>
  );
}