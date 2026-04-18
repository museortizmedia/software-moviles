import { useState, useEffect } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { LocalNotifications } from '@capacitor/local-notifications';

export const useMissions = (onMissionComplete: (id: string) => void) => {
  const [startCoords, setStartCoords] = useState<any>(null);
  const [distance, setDistance] = useState(0);

  // MISIÓN 1: Cámara
  const takePhotoMission = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });
      if (image) {
        completeAction("photo");
      }
    } catch (e) { console.error("User cancelled camera"); }
  };

  // MISIÓN 2: Geolocation (Cálculo de distancia Haversine simplificado)
  const trackMovement = async () => {
    const watchId = await Geolocation.watchPosition({ enableHighAccuracy: true }, (position) => {
      if (!position) return;
      
      if (!startCoords) {
        setStartCoords(position.coords);
        return;
      }

      const dist = calculateDistance(
        startCoords.latitude, startCoords.longitude,
        position.coords.latitude, position.coords.longitude
      );
      
      setDistance(dist);
      if (dist >= 30) { // Requisito parcial: > 30m
        completeAction("move");
        Geolocation.clearWatch({ id: watchId });
      }
    });
  };

  // MISIÓN 3: Timer + Vibración
  const waitAndVibrate = () => {
    setTimeout(async () => {
      await Haptics.impact({ style: ImpactStyle.Heavy });
      completeAction("still");
      
      await LocalNotifications.schedule({
        notifications: [{ title: "Misión Completa", body: "¡Has vibrado!", id: 3 }]
      });
    }, 10000); // 10 segundos
  };

  const completeAction = (id: string) => {
    onMissionComplete(id);
  };

  return { takePhotoMission, trackMovement, waitAndVibrate, distance };
};

// Función auxiliar para distancia
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // metros
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}