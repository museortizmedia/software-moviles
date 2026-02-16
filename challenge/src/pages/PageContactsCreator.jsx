import React, { useState, useEffect } from "react";
import CommonInput from "../components/CommonInput";
import CommonButton from "../components/CommonButton";
import { addContact, updateContact } from "../services/indexedDB";

export default function PageContactsCreator({ isOpen, SetIsOpen, currentContact, setCurrentContact, onContactCreated, onContactEdited }) {
  const emptyForm = {
    id: null,
    name: "",
    photo: "",
    phone: "",
    email: "",
    birthday: "",
  };

  const [form, setForm] = useState(emptyForm);

  const isEditing = Boolean(currentContact);

  /* Sincronizar formulario con edición */
  useEffect(() => {
    if (currentContact) {
      setForm({...currentContact});
    } else {
      setForm(emptyForm);
    }
  }, [currentContact, isOpen]);

  /* Handlers */

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleClose = () => {
    setForm(emptyForm);
    SetIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (isEditing) {
      await updateContact(form);
      onContactEdited?.();
      setCurrentContact(null);
    } else {
      await addContact(form);
      onContactCreated?.();
    }

    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl">

        <h2 className="text-2xl font-bold mb-6">
          {isEditing ? "Editar Contacto" : "Crear Contacto"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Sección superior */}
          <div className="flex items-center gap-6">

            {/* Preview */}
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-gray-500">
                  {form.name
                    ? form.name.charAt(0).toUpperCase()
                    : "?"}
                </span>
              )}
            </div>

            {/* Nombre grande */}
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600">
                Nombre
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  handleChange("name", e.target.value)
                }
                required
                className="w-full text-2xl font-bold border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 py-1"
              />
            </div>
          </div>

          {/* URL Imagen */}
          <CommonInput
            label="URL Foto"
            value={form.photo ?? ""}
            onChange={(e) =>
              handleChange("photo", e.target.value)
            }
          />

          {/* Sección inferior */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <CommonInput
              label="Celular"
              value={form.phone ?? ""}
              onChange={(e) =>
                handleChange("phone", e.target.value)
              }
            />

            <CommonInput
              label="Email"
              type="email"
              value={form.email ?? ""}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
            />

            <CommonInput
              label="Fecha de nacimiento"
              type="date"
              value={form.birthday ?? ""}
              onChange={(e) =>
                handleChange("birthday", e.target.value)
              }
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4">
            <CommonButton
              type="button"
              onClick={handleClose}
              variant="normal"
            >
              Cancelar
            </CommonButton>

            <CommonButton
              type="submit"
              variant={isEditing ? "positive" : "normal"}
            >
              {isEditing ? "Actualizar" : "Crear"}
            </CommonButton>
          </div>

        </form>
      </div>
    </div>
  );
}