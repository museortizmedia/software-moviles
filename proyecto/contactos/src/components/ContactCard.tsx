import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonAvatar,
  IonIcon,
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from "@ionic/react";

import {
  create,
  trash,
  call,
  gift,
  calendar
} from "ionicons/icons";

import { deleteContact } from "../services/indexedDB";

interface Props {
  contact: any;
  handleEdit: (contact: any) => void;
  onDelete: () => void;
}

export default function ContactCard({
  contact,
  handleEdit,
  onDelete
}: Props) {

  const handleDelete = async () => {
    await deleteContact(contact.id);
    onDelete();
  };

  function calculateAge(birthday: string) {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());
    if (!hasHadBirthdayThisYear) age--;
    return age;
  }

  function formatBirthday(dateString: string) {
    if (!dateString) return "";
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("es-ES", {
      month: "long",
      day: "numeric",
    });
  }

  return (
    <IonItemSliding>

      <IonCard style={{ width: "100%" }}>

        <IonItem lines="none">
          <IonAvatar slot="start">
            {contact.photo ? (
              <img src={contact.photo} alt={contact.name} />
            ) : (
              <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold"
              }}>
                {contact.name.charAt(0).toUpperCase()}
              </div>
            )}
          </IonAvatar>

          <IonLabel>
            <IonCardHeader>
              <IonCardTitle>{contact.name}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>

              {contact.phone && (
                <p>
                  <IonIcon icon={call} /> {contact.phone}
                </p>
              )}

              {contact.birthday && (
                <>
                  <p>
                    <IonIcon icon={calendar} /> {calculateAge(contact.birthday)} años
                  </p>
                  <p>
                    <IonIcon icon={gift} /> {formatBirthday(contact.birthday)}
                  </p>
                </>
              )}

            </IonCardContent>
          </IonLabel>
        </IonItem>

      </IonCard>

      {/* Acciones swipe */}
      <IonItemOptions side="end">
        <IonItemOption
          color="primary"
          onClick={() => handleEdit(contact)}
        >
          <IonIcon icon={create} slot="icon-only" />
        </IonItemOption>

        <IonItemOption
          color="danger"
          onClick={handleDelete}
        >
          <IonIcon icon={trash} slot="icon-only" />
        </IonItemOption>
      </IonItemOptions>

    </IonItemSliding>
  );
}