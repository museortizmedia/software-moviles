import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

export const haptics = {
  light: async () => {
    await Haptics.impact({ style: ImpactStyle.Light });
  },

  medium: async () => {
    await Haptics.impact({ style: ImpactStyle.Medium });
  },

  heavy: async () => {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  },

  error: async () => {
    await Haptics.notification({ type: NotificationType.Error });
  },

  success: async () => {
    await Haptics.notification({ type: NotificationType.Success });
  },

  warning: async () => {
    await Haptics.notification({ type: NotificationType.Warning });
  },

  long: async () => {
    // vibración "larga" simulada (Capacitor no tiene long vibration nativa)
    await Haptics.impact({ style: ImpactStyle.Heavy });
    setTimeout(() => Haptics.impact({ style: ImpactStyle.Heavy }), 120);
    setTimeout(() => Haptics.impact({ style: ImpactStyle.Heavy }), 240);
  },
};