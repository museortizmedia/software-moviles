import React, {useState} from "react";
import { Gift, Trash2, Pencil, Phone, Calendar } from "lucide-react";
import { deleteContact } from "../services/indexedDB"

export default function ContactCard({ contact, handleEdit, onDelete }) {

  const handleDelete = async (id) => {
    await deleteContact(id);
    onDelete();
  };

  function calculateAge(birthday) {
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());
  if (!hasHadBirthdayThisYear) {
    age--;
  }
return age;
}

function formatBirthday(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString + "T00:00:00");

  return date.toLocaleDateString("es-ES", {
    month: "long",
    day: "numeric",
  });
}


  

  return (
    <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex h-36">

      {/* Acciones */}
      <div className="absolute top-2 right-2 flex gap-2">

        {/* Editar */}
        <button
          onClick={() => handleEdit(contact)}
          className="p-1 rounded-lg hover:bg-blue-100 transition"
        >
          <Pencil
            size={16}
            className="text-gray-400 hover:text-blue-500 transition"
          />
        </button>

        {/* Eliminar */}
        <button
          onClick={() => handleDelete(contact.id)}
          className="p-1 rounded-lg hover:bg-red-100 transition"
        >
          <Trash2
            size={16}
            className="text-gray-400 hover:text-red-500 transition"
          />
        </button>

      </div>

      {/* Imagen - 1/3 */}
      <div className="w-1/3 bg-gray-200">
        {contact.photo ? (
          <img
            src={contact.photo}
            alt={contact.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-600">
            {contact.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Contenido - 2/3 */}
      <div className="w-2/3 flex flex-col">

        {/* Header fijo */}
        <div className="px-4 py-2 bg-white">
          <h2 className="text-lg font-bold text-gray-900 truncate">
            {contact.name}
          </h2>
        </div>

        {/* Body con scroll */}
        <div className="flex-1 px-4 py-2 overflow-y-auto text-xs text-gray-500 space-y-1">

          {contact.phone && (
            <p className="flex items-center gap-1">
              <Phone size={12} />
              {contact.phone}</p>
          )}

          {contact.birthday && (
            <>
            <p className="flex items-center gap-1">
              <Calendar size={12} />
              {calculateAge(contact.birthday)} años
            </p>
             <p className="flex items-center gap-1">
              <Gift size={12} />
              {formatBirthday(contact.birthday)}
            </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
