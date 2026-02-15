import React, { useEffect, useState } from "react";
import ContactCard from "../components/ContactCard";
import CommonInput from "../components/CommonInput";
import { getAllContacts } from "../services/indexedDB";

export default function PageContactsList({ handleEdit }) {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  const loadContacts = async () => {
    const data = await getAllContacts();
    setContacts(data);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );


  return (
    <div className="space-y-6">
      <CommonInput
        label="Filtrar por nombre"
        placeholder="Escribe un nombre..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((contact) => (
          <ContactCard key={contact.id} contact={contact} handleEdit={handleEdit} onDelete={loadContacts} />
        ))}
      </div>
    </div>
  );
}