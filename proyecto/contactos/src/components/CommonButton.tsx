import React from "react";
import { IonButton } from "@ionic/react";

interface Props {
  children: React.ReactNode;
  variant?: "normal" | "positive" | "negative" | "gray";
  className?: string;
  [key: string]: any;
}

export default function CommonButton({
  children,
  variant = "normal",
  className = "",
  ...props
}: Props) {

  const colorMap: Record<string, string> = {
    normal: "primary",
    positive: "success",
    negative: "danger",
    gray: "medium"
  };

  return (
    <IonButton
      color={colorMap[variant]}
      className={className}
      {...props}
    >
      {children}
    </IonButton>
  );
}