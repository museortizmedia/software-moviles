import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/Card';
import { PetVaxColors } from '../../colors';
import { ProfileImagePicker } from '../../components/ProfileImagePicker';
import { Input } from '../../components/Input';

export const Profile: React.FC = () => {
  const {
    user,
    updateProfile,
    uploadProfileImage,
    refreshProfile,
  } = useAuth();

  const [fullName, setFullName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) return;

    setFullName(user.full_name ?? '');
    setDisplayName(user.display_name ?? '');
    setPhone(user.phone ?? '');
    setProfilePic(user.profile_pic ?? null);
  }, [user]);

  const handleSave = async () => {
    if (uploading) return;

    try {
      setLoading(true);

      await updateProfile({
        full_name: fullName,
        display_name: displayName,
        phone,
      });

      await refreshProfile();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file?: File) => {
    if (!file || !user?.id) return;

    try {
      setUploading(true);

      const url = await uploadProfileImage(file);

      await updateProfile({
        profile_pic: url,
      });

      await refreshProfile();
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6">

      {/* HEADER GLOBAL */}
      <div className="space-y-1">
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ color: PetVaxColors.onSurface }}
        >
          Perfil
        </h1>

        <p
          className="text-sm"
          style={{ color: PetVaxColors.onSurfaceVariant }}
        >
          Gestiona tu información personal y preferencias.
        </p>
      </div>

      {/* CARD */}
      <Card>
        <div className="space-y-6 m-4">

          {/* HEADER CARD (ICON + TITLE) */}
          <div className="flex items-center gap-3">
            <User size={20} className="text-[#00685f]" />
            <h2 className="text-lg font-semibold text-black">
              Tu perfil
            </h2>
          </div>

          {/* AVATAR CENTRADO */}
          <div className="flex justify-center">
            <ProfileImagePicker
              value={profilePic}
              onChange={handleUpload}
              loading={uploading}
            />
          </div>

          {/* FORM */}
          <div className="space-y-4 text-sm">

            <div>
              <label className="text-xs text-gray-500">
                Nombre público
              </label>

              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

                        <div>
              <label className="text-xs text-gray-500">
                Nombre completo
              </label>

              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">
                Teléfono
              </label>

              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* PLAN */}
          <div className="text-xs text-slate-500">
            Plan actual:{' '}
            <span className="font-semibold">
              {user.plan === 'premium' ? 'Premium' : 'Gratuito'}
            </span>
          </div>

          

        </div>
      </Card>
      {/* SAVE */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-[#00685f] text-white py-2 rounded-lg text-sm font-semibold"
          >
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
    </div>
  );
};