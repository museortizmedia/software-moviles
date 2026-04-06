import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon
} from "@ionic/react";

import PageContactsList from "./PageContactsList";
import PageContactsCreator from "./PageContactsCreator";
import FullScreenLoader from "../components/FullScreenLoader";
import type { PageContactsListRef } from "./PageContactsList";
import { logOut } from "ionicons/icons";
import { useAuth } from "../hooks/useAuth";

const Home: React.FC = () => {

  const { logout: logoutUser } = useAuth();

  const listRef = useRef<PageContactsListRef>(null);
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);

  const handleEdit = (contact: any) => {
    history.push("/form/" + contact.id)
  };

  const refresh = () => {
    listRef.current?.reload();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const moveToCreateContact = (e: any) => {
    (e.currentTarget as HTMLButtonElement).blur();
    history.push("/form");
  }

  const handleLogout = async () => {
  try {
    await logoutUser();
    history.replace('/');
  } catch (error) {
    console.error("Error logout", error);
  }
};


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestión de Contactos</IonTitle>
          <IonButton fill="clear" onClick={handleLogout}>
            <IonIcon icon={logOut} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <FullScreenLoader isOpen={isLoading} />

        <div className="ion-text-right ion-margin-bottom">
          <IonButton onClick={moveToCreateContact}>
            + Nuevo Contacto
          </IonButton>
        </div>

        <PageContactsList
          ref={listRef}
          handleEdit={handleEdit}
        />

      </IonContent>
    </IonPage>
  );
};

export default Home;