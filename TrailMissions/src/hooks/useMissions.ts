import { useState, useEffect } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { LocalNotifications } from '@capacitor/local-notifications';

export const useMissions = (
  onMissionComplete: (id: string, pts: number) => void
) => {

  const [startCoords, setStartCoords] = useState<any>(null);
  const [distance, setDistance] = useState(0);

  const POINTS = {
    photo: 33,
    move: 33,
    still: 34
  };

  useEffect(() => {
    LocalNotifications.requestPermissions();
  }, []);

  const takePhotoMission = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });

      if (image) {
        completeAction("photo");

        await notify(
          "Misión completada",
          "Tomaste la foto",
          1
        );
      }

    } catch (e) {}
  };

  const trackMovement = async () => {
    const watchId = await Geolocation.watchPosition(
      { enableHighAccuracy: true },
      (position) => {

        if (!position) return;

        if (!startCoords) {
          setStartCoords(position.coords);
          return;
        }

        const dist = calculateDistance(
          startCoords.latitude,
          startCoords.longitude,
          position.coords.latitude,
          position.coords.longitude
        );

        setDistance(dist);

        if (dist >= 30) {
          completeAction("move");

          Geolocation.clearWatch({ id: watchId });

          notify(
            "Misión completada",
            "Te moviste 30 metros",
            2
          );
        }
      }
    );
  };

  const waitAndVibrate = () => {
    setTimeout(async () => {

      await Haptics.impact({
        style: ImpactStyle.Heavy
      });

      completeAction("still");

      await notify(
        "Misión completada",
        "Te mantuviste quieto",
        3
      );

    }, 10000);
  };

  const completeAction = (
    id: keyof typeof POINTS
  ) => {
    onMissionComplete(id, POINTS[id]);
  };

  return {
    takePhotoMission,
    trackMovement,
    waitAndVibrate,
    distance
  };
};

const notify = async (
  title: string,
  body: string,
  id: number
) => {
  await LocalNotifications.schedule({
    notifications: [
      {
        id,
        title,
        body,
        schedule: {
          at: new Date(Date.now() + 100)
        }
      }
    ]
  });
};

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const toRad = (v: number) => v * Math.PI / 180;

  const R = 6371e3;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  return R * 2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );
}