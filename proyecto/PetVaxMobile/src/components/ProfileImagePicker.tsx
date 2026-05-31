import React, { useEffect, useRef, useState } from 'react';
import { Camera, Folder } from 'lucide-react';
import {
    Camera as CapacitorCamera,
    CameraResultType,
    CameraSource,
} from '@capacitor/camera';

import { PetVaxColors } from '../colors';

interface Props {
    value: string | null; // URL actual (Supabase)
    onChange: (file: File) => void;
    loading?: boolean;
}

export const ProfileImagePicker: React.FC<Props> = ({
    value,
    onChange,
    loading = false,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [preview, setPreview] = useState<string | null>(value);

    // 🔥 sincroniza cuando viene nueva URL del backend
    useEffect(() => {
        setPreview(value);
    }, [value]);

    const handleFile = (file?: File) => {
        if (!file) return;

        const url = URL.createObjectURL(file);
        setPreview(url);

        onChange(file);
    };

    // 📷 CAPACITOR CAMERA
    const takePhoto = async () => {
        try {
            const photo = await CapacitorCamera.getPhoto({
                resultType: CameraResultType.Uri,
                source: CameraSource.Camera,
                quality: 85,
            });

            if (!photo.webPath) return;

            const response = await fetch(photo.webPath);
            const blob = await response.blob();

            const file = new File(
                [blob],
                `profile-${Date.now()}.jpg`,
                { type: 'image/jpeg' }
            );

            handleFile(file);
        } catch (err) {
            console.error('Error cámara:', err);
        }
    };

    // 📁 GALERÍA WEB
    const openGallery = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="relative w-24 h-24">

            {/* AVATAR */}
            <div
                className="w-24 h-24 rounded-full border-3 flex items-center justify-center"
                style={{ borderColor: PetVaxColors.primary }}
            >
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center relative">
                    {preview ? (
                        <img
                            src={preview}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="text-xs text-gray-400">
                            Sin foto
                        </div>
                    )}

                    {loading && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-xs">
                            Subiendo...
                        </div>
                    )}
                </div>
            </div>

            {/* 📷 CAMARA */}
            <button
                type="button"
                onClick={takePhoto}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border flex items-center justify-center shadow"
                style={{backgroundColor: PetVaxColors.primary }}
            >
                <Camera size={16} className="text-white" />
            </button>

            {/* 📁 GALERÍA */}
            <button
                type="button"
                onClick={openGallery}
                className="absolute bottom-0 left-0 w-8 h-8 rounded-full bg-white border flex items-center justify-center shadow"
                style={{ backgroundColor: PetVaxColors.primary }}
            >
                <Folder size={16} className="text-white" />
            </button>

            {/* INPUT FILE WEB */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                }}
            />
        </div>
    );
};