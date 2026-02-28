import React, { useState, useEffect, useCallback } from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonPage,
  IonIcon
} from "@ionic/react";

import { addContact, deleteContact, get, updateContact } from "../services/indexedDB";
import type { Contact } from "../services/indexedDB";
import { useParams } from "react-router";
import { trash } from "ionicons/icons";

interface Props {
  onContactCreated?: () => void;
  onContactEdited?: () => void;
}

const PageContactsCreator: React.FC<Props> = ({
  onContactCreated,
  onContactEdited
}) => {

  const emptyForm: Contact = {
    name: "",
    photo: "",
    phone: "",
    email: "",
    birthday: "",
  };

  const [form, setForm] = useState(emptyForm);

  const { id } = useParams<{ id: string }>();

  const loadContacts = async () => {
    if (!id) return;

    const data = await get(id);

    if (data) {
      setForm(data);
    }
  };

  loadContacts();

  const isEditing = Boolean(id);

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setForm(emptyForm);
    history.back();
  };

  const handleDelete = () => {
    deleteContact(Number(id));
    history.back();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (isEditing) {
      await updateContact(form);
      onContactEdited?.();
    } else {
      const { id, ...contactWithoutId } = form;
      await addContact(contactWithoutId);
      onContactCreated?.();
    }

    handleClose();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {isEditing ? "Editar Contacto" : "Crear Contacto"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>

          {/* Avatar + Nombre */}
          <IonItem lines="none">
            <IonAvatar slot="start">
              {form.photo ? (
                <img src={form.photo} alt="preview" />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "20px"
                  }}
                >
                  {form.name
                    ? form.name.charAt(0).toUpperCase()
                    : "?"}
                </div>
              )}
            </IonAvatar>

            <IonItem lines="full">
              <IonLabel position="stacked">Nombre</IonLabel>
              <IonInput
                value={form.name}
                required
                onIonChange={e =>
                  handleChange("name", e.detail.value!)
                }
              />
            </IonItem>
          </IonItem>

          {/* URL Foto */}
          <IonItem>
            <IonLabel position="stacked">URL Foto</IonLabel>
            <IonInput
              value={form.photo}
              onIonChange={e =>
                handleChange("photo", e.detail.value!)
              }
            />
          </IonItem>

          <IonGrid>
            <IonRow>
              <IonCol size="12" sizeMd="6">
                <IonItem>
                  <IonLabel position="stacked">Celular</IonLabel>
                  <IonInput
                    value={form.phone}
                    onIonChange={e =>
                      handleChange("phone", e.detail.value!)
                    }
                  />
                </IonItem>
              </IonCol>

              <IonCol size="12" sizeMd="6">
                <IonItem>
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput
                    type="email"
                    value={form.email}
                    onIonChange={e =>
                      handleChange("email", e.detail.value!)
                    }
                  />
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" sizeMd="6">
                <IonItem>
                  <IonLabel position="stacked">
                    Fecha de nacimiento
                  </IonLabel>
                  <IonInput
                    type="date"
                    value={form.birthday}
                    onIonChange={e =>
                      handleChange("birthday", e.detail.value!)
                    }
                  />
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* Botones */}
          <div className="ion-text-right ion-padding-top">

            <IonButton
              fill="outline"
              onClick={handleClose}
            >
              Cancelar
            </IonButton>

            <IonButton
              type="submit"
              color={isEditing ? "success" : "primary"}
            >
              {isEditing ? "Actualizar" : "Crear"}
            </IonButton>
          </div>

{isEditing && (
          <IonButton
            fill="clear"
              onClick={handleDelete}
              color={"danger"}
            >
              <IonIcon slot="icon-only" icon={trash}></IonIcon>
              Eliminar
            </IonButton>
)}

        </form>

      </IonContent>

    </IonPage>
  );
};

export default PageContactsCreator;