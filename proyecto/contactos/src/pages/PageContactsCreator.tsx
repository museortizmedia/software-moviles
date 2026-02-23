import React, { useState, useEffect } from "react";
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
  IonAvatar
} from "@ionic/react";

import { addContact, updateContact } from "../services/indexedDB";
import type { Contact } from "../services/indexedDB";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  currentContact: Contact | null;
  setCurrentContact: (value: Contact | null) => void;
  onContactCreated?: () => void;
  onContactEdited?: () => void;
}

const PageContactsCreator: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  currentContact,
  setCurrentContact,
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

  const isEditing = Boolean(currentContact);

  useEffect(() => {
    if (currentContact) {
      setForm({ ...currentContact });
    } else {
      setForm(emptyForm);
    }
  }, [currentContact, isOpen]);

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setForm(emptyForm);
    setCurrentContact(null);
    setIsOpen(false);
  };

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
    <IonModal isOpen={isOpen} onDidDismiss={handleClose}>
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

        </form>
      </IonContent>
    </IonModal>
  );
};

export default PageContactsCreator;