// services/push.ts
import { PushNotifications } from '@capacitor/push-notifications';
import { supabase } from '../supabaseClient';

export const initPush = async (userId: string) => {
  let token: string | null = null;

  await PushNotifications.requestPermissions();

  await PushNotifications.register();

  PushNotifications.addListener('registration', async (t) => {
    token = t.value;

    await supabase.from('user_devices').insert({
      user_id: userId,
      fcm_token: token,
      platform: 'mobile',
    });
  });

  PushNotifications.addListener('registrationError', (err) => {
    console.error('Push error:', err);
  });
};