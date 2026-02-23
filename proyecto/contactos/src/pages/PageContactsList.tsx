import React, {
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle
} from "react";
import {
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonSearchbar,
  IonButton,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  useIonViewWillEnter
} from "@ionic/react";

import { getAllContacts } from "../services/indexedDB";
import type { Contact } from "../services/indexedDB";

interface Props {
  handleEdit: (contact: Contact) => void;
}

export interface PageContactsListRef {
  reload: () => void;
}

const PageContactsList = forwardRef<PageContactsListRef, Props>(
  ({ handleEdit }, ref) => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [filter, setFilter] = useState("");

    const loadContacts = useCallback(async () => {
      const data = await getAllContacts();
      setContacts(data);
    }, []);

    // 🔥 Exponemos método al padre
    useImperativeHandle(ref, () => ({
      reload: loadContacts
    }));

    useIonViewWillEnter(() => {
      loadContacts();
    });

    const filtered = contacts.filter((c) =>
      c.name?.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <>
        <IonSearchbar
          placeholder="Filtrar por nombre..."
          value={filter}
          onIonInput={(e) => setFilter(e.detail.value!)}
        />

        <IonList>
          {filtered.map((contact) => (
            <IonItemSliding key={contact.id}>
              <IonItem button onClick={() => handleEdit(contact)}>
                <IonAvatar slot="start">
                  {contact.photo ? (
                    <img src={contact.photo} alt="avatar" />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold"
                      }}
                    >
                      {contact.name?.charAt(0).toUpperCase() ?? "?"}
                    </div>
                  )}
                </IonAvatar>

                <IonLabel>
                  <h2>{contact.name}</h2>
                  <p>{contact.phone}</p>
                  <p>{contact.email}</p>
                </IonLabel>
              </IonItem>

              <IonItemOptions side="end">
                <IonItemOption
                  color="primary"
                  onClick={() => handleEdit(contact)}
                >
                  Editar
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </>
    );
  }
);

export default PageContactsList;