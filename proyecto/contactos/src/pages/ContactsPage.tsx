import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton
} from '@ionic/react';
import { useState, useEffect, useRef } from 'react';
import FullScreenLoader from '../components/FullScreenLoader';
import PageContactsCreator from './PageContactsCreator';
import PageContactsList from './PageContactsList';
import type { PageContactsListRef } from "./PageContactsList";
import type { Contact } from "../services/indexedDB";

const ContactsPage: React.FC = () => {

const listRef = useRef<PageContactsListRef>(null);

  const refresh = () => {
    listRef.current?.reload?.();
  };

  const [isOpen, setIsOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleEdit = (contact: Contact) => {
    setCurrentContact(contact);
    setIsOpen(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

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

        {isLoading && <FullScreenLoader isOpen={isLoading} />}

        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex justify-end">
            <IonButton onClick={() => setIsOpen(true)}>
              + Nuevo Contacto
            </IonButton>
          </div>

          {/*<PageContactsCreator
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            currentContact={currentContact}
            setCurrentContact={setCurrentContact}
            onContactCreated={refresh}
            onContactEdited={refresh}
          />*/}

          <PageContactsList
            ref={listRef}
            handleEdit={handleEdit}
          />
        </div>

      </IonContent>
    </IonPage>
  );
};

export default ContactsPage;