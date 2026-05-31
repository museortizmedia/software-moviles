import React, { useEffect, useState } from 'react';
import { Pencil, Plus } from 'lucide-react';

import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { PetVaxColors } from '../../colors';
import { useAuth } from '../../context/AuthContext';
import { ProfileImagePicker } from '../../components/ProfileImagePicker';
import { supabaseService } from '../../services/supabase';
import { supabase } from '../../supabaseClient';

import { PetTypeSelector } from '../../components/PetTypeSelector';
import { MonthSelector } from '../../components/MonthSelector';
import { YearSelector } from '../../components/YearSelector';
import { DatePicker } from '../../components/DatePicker';

import { usePets } from '../../context/PetsContext';

interface Pet {
  id: string;
  user_id: string;
  name: string;
  photo: string | null;
  type: 'gato' | 'perro' | 'otro';
  breed: string;
  birth_month: number | null;
  birth_year: number | null;
  weight: number | null;

  last_vaccination_date: string | null;
  last_deworming_date: string | null;
  last_bath_date: string | null;

  created_at: string;
  updated_at: string;
}

export const Pets: React.FC = () => {
  const { user } = useAuth();

  const { pets, loading: petsLoading, refreshPets } = usePets();
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ESTADOS DEL FORMULARIO
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [type, setType] = useState<'gato' | 'perro' | 'otro'>('perro');
  const [weight, setWeight] = useState<number | ''>('');
  const [birthMonth, setBirthMonth] = useState<number | ''>('');
  const [birthYear, setBirthYear] = useState<number | ''>('');
  const [vaccinationDate, setVaccinationDate] = useState('');
  const [dewormingDate, setDewormingDate] = useState('');
  const [bathDate, setBathDate] = useState('');

  const resetForm = () => {
    setPhoto(null);
    setPhotoPreview(null);
    setName('');
    setBreed('');
    setWeight('');
    setBirthMonth('');
    setBirthYear('');
    setVaccinationDate('');
    setDewormingDate('');
    setBathDate('');
  };

  const openCreatePet = () => {
    // Validación de plan basada en los datos en tiempo real de tu AuthContext
    if (user?.plan === 'free' && pets.length >= 1) {
      alert('Tu plan free solo permite 1 mascota registrada.');
      return;
    }
    setSelectedPet(null);
    resetForm();
    setModalOpen(true);
  };

  const openEditPet = (pet: Pet) => {
    setSelectedPet(pet);
    setPhotoPreview(pet.photo);
    setName(pet.name);
    setBreed(pet.breed);
    setWeight(pet.weight ?? '');
    setBirthMonth(pet.birth_month ?? '');
    setBirthYear(pet.birth_year ?? '');
    setVaccinationDate(pet.last_vaccination_date ?? '');
    setDewormingDate(pet.last_deworming_date ?? '');
    setBathDate(pet.last_bath_date ?? ''); // Mapeado correctamente
    setModalOpen(true);
  };

  const handleUpload = async (file: File) => {
    if (!user?.id) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  // 💾 GUARDADO DIRECTO A SUPABASE
  const handleSave = async () => {
    if (!user?.id) {
      alert("No se detectó una sesión de usuario activa.");
      return;
    }

    if (!name.trim()) {
      alert("El nombre de la mascota es obligatorio.");
      return;
    }

    try {
      setLoading(true);
      let photoUrl = selectedPet?.photo ?? null;

      // Procesar subida al Bucket de Storage
      if (photo) {
        try {
          photoUrl = await supabaseService.uploadProfileImage(
            user.id,
            photo,
            'pets'
          );
        } catch (imgErr: any) {
          console.error("Error en Storage de imagen:", imgErr);
          alert(`Error en imagen: ${imgErr.message}. Asegúrate de que el bucket 'pets' exista y sea público.`);
          setLoading(false);
          return;
        }
      }

      const payload = {
        user_id: user.id,
        photo: photoUrl,
        name: name.trim(),
        breed: breed.trim(),
        weight: weight === '' ? null : Number(weight),
        type: type, // Valor por defecto estricto exigido por base de datos
        birth_month: birthMonth === '' ? null : Number(birthMonth),
        birth_year: birthYear === '' ? null : Number(birthYear),
        last_vaccination_date: vaccinationDate || null,
        last_deworming_date: dewormingDate || null,
        last_bath_date: bathDate || null,
      };

      if (selectedPet) {
        // CASO: ACTUALIZACIÓN
        const { error } = await supabase
          .from('pets')
          .update(payload)
          .eq('id', selectedPet.id);

        if (error) throw error;
      } else {
        // CASO: INSERCIÓN NUEVA
        const { error } = await supabase
          .from('pets')
          .insert([payload]);

        if (error) throw error;
      }

      // Sincronizar el estado actual de la pantalla
      await refreshPets();

      setModalOpen(false);
      resetForm();
    } catch (err: any) {
      console.error("Error retenido en operación de BD:", err);
      if (err?.message?.includes('Plan gratuito limitado')) {
        alert('⚠️ Tu plan gratuito solo permite 1 mascota. ¡Pásate a Premium para registrar más!');
      } else {
        alert(`Error al guardar en la base de datos: ${err.message || 'Verifica los tipos de datos'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 relative pb-20">
      <div>
        <h1 className="text-2xl font-bold text-black">Mis Mascotas</h1>
      </div>

      {/* LISTA DE TARJETAS */}
      <div className="space-y-4">
        {pets.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            No tienes mascotas registradas. Presiona el botón + para empezar.
          </div>
        ) : (
          pets.map((pet) => {
            const age = pet.birth_year ? new Date().getFullYear() - pet.birth_year : null;

            return (
              <div
                key={pet.id}
                className="relative w-full bg-white border border-gray-100 shadow-sm rounded-xl p-4"
              >
                {/* EDIT BUTTON (BOTTOM RIGHT) */}
                <button
                  onClick={() => openEditPet(pet)}
                  className="absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                  style={{ backgroundColor: `${PetVaxColors.primary}50` }}
                >
                  <Pencil size={18} className='text-[#00685f]' />
                </button>

                {/* PHOTO */}
                <div className="flex justify-center mb-3">
                  <div className="w-24 h-24 rounded-full border-3 flex items-center justify-center" style={{ borderColor: PetVaxColors.primary }}>

                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center relative">

                      {pet.photo ? (
                        <img
                          src={pet.photo}
                          className="w-full h-full object-cover"
                          alt={pet.name}
                        />
                      ) : (
                        <div className="text-xs text-gray-400 text-center">
                          Sin foto
                        </div>
                      )}

                    </div>
                  </div>
                </div>

                {/* NAME */}
                <h3 className="text-left font-bold text-black text-base">
                  {pet.name}
                </h3>

                {/* BREED */}
                <p className="text-left text-sm text-gray-500">
                  {pet.breed || 'Sin raza'} • {age !== null ? `${age} años` : 'Edad desconocida'} • {pet.weight ? `${pet.weight} kg` : 'Sin peso'}
                </p>

              </div>
            );
          })
        )}
      </div>

      {/* BOTÓN FLOTANTE ACCIÓN (FAB) */}
      {!petsLoading && (
        <button
          onClick={openCreatePet}
          className="fixed bottom-22 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-xl active:scale-95 transition-transform z-40"
          style={{ backgroundColor: PetVaxColors.primary }}
        >
          <Plus color="white" />
        </button>
      )}

      {/* VENTANA MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 transition-opacity"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-xl flex flex-col max-h-[85vh] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER MODAL */}
            <div className="p-4 border-b bg-white">
              <h2 className="font-semibold text-black">
                {selectedPet ? 'Editar mascota' : 'Nueva mascota'}
              </h2>
            </div>

            {/* CUERPO MODAL (SCROLLABLE) */}
            <div className="p-4 space-y-4 overflow-y-auto flex-1 text-black bg-white">
              <div className="flex justify-center mb-2">
                <ProfileImagePicker
                  value={photoPreview}
                  onChange={handleUpload}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 px-1">Nombre *</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Max" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 px-1">Raza</label>
                <Input value={breed} onChange={(e) => setBreed(e.target.value)} placeholder="Ej. Golden Retriever" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 px-1">Peso (kg)</label>
                <Input
                  value={weight}
                  onChange={(e) => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Ej. 12"
                  type="number"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 px-1">
                  Tipo de mascota
                </label>
                <PetTypeSelector value={type} onChange={setType} />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 px-1">
                  Mes de nacimiento
                </label>
                <MonthSelector value={birthMonth} onChange={setBirthMonth} />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 px-1">
                  Año de nacimiento
                </label>
                <YearSelector value={birthYear} onChange={setBirthYear} />
              </div>

              <hr className="border-gray-100 my-2" />

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 px-1 block">Última Vacunación</label>
                <DatePicker value={vaccinationDate} onChange={setVaccinationDate} />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 px-1 block">Última Desparasitación</label>
                <DatePicker value={dewormingDate} onChange={setDewormingDate} />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 px-1 block">Último Baño / Estética</label>
                <DatePicker value={bathDate} onChange={setBathDate} />
              </div>
            </div>

            {/* BOTONES ACCIÓN FOOTER */}
            <div className="p-4 border-t flex justify-end gap-2 bg-gray-50">
              {/*selectedPet && (
                <button
                  type="button"
                  className="text-black bg-red-200 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-300 transition-colors"
                  onClick={() => setModalOpen(false)}
                >
                  Eliminar
                </button>
              )*/}

              <button
                type="button"
                className="text-black bg-gray-200 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-300 transition-colors"
                onClick={() => setModalOpen(false)}
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={loading}
                className="text-white px-5 py-2 rounded-lg font-medium text-sm shadow-sm hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center"
                style={{ backgroundColor: PetVaxColors.primary }}
              >
                {loading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};