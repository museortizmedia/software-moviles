import React, { useState, useEffect, useRef } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton
} from "@ionic/react";

import PageContactsList from "./PageContactsList";
import PageContactsCreator from "./PageContactsCreator";
import FullScreenLoader from "../components/FullScreenLoader";
import type { PageContactsListRef } from "./PageContactsList";

const Home: React.FC = () => {

  const listRef = useRef<PageContactsListRef>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleEdit = (contact: any) => {
    setCurrentContact(contact);
    setIsOpen(true);
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestión de Contactos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <FullScreenLoader isOpen={isLoading} />

        <div className="ion-text-right ion-margin-bottom">
          <IonButton onClick={() => setIsOpen(true)}>
            + Nuevo Contacto
          </IonButton>
        </div>

        <PageContactsList
          ref={listRef}
          handleEdit={handleEdit}
        />

        <PageContactsCreator
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          currentContact={currentContact}
          setCurrentContact={setCurrentContact}
          onContactCreated={refresh}
          onContactEdited={refresh}
        />

      </IonContent>
    </IonPage>
  );
};

export default Home;