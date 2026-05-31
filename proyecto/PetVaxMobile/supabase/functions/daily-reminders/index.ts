import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // 1. obtener pets + user devices
  const { data: pets } = await supabase.from("pets").select("*");

  const { data: devices } = await supabase
    .from("user_devices")
    .select("*");

  if (!pets || !devices) {
    return new Response("no data");
  }

  // 2. helper push
  const sendPush = async (token: string, title: string, body: string) => {
    await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `key=${Deno.env.get("FCM_SERVER_KEY")}`,
      },
      body: JSON.stringify({
        to: token,
        notification: {
          title,
          body,
        },
      }),
    });
  };

  // 3. lógica de recordatorios
  for (const pet of pets) {
    const ownerDevices = devices.filter(d => d.user_id === pet.user_id);

    // VACUNA
    if (pet.reminder_vaccination_enabled && pet.last_vaccination_date) {
      const last = new Date(pet.last_vaccination_date);
      const next = new Date(last);
      next.setFullYear(next.getFullYear() + 1);

      const diffDays = Math.ceil(
        (next.getTime() - Date.now()) / 86400000
      );

      if (diffDays <= 7) {
        for (const d of ownerDevices) {
          await sendPush(
            d.fcm_token,
            "Vacunación pendiente 🐶",
            `${pet.name} necesita su vacuna en ${diffDays} días`
          );
        }
      }
    }

    // BAÑO
    if (pet.reminder_bath_enabled && pet.last_bath_date) {
      const last = new Date(pet.last_bath_date);
      const next = new Date(last);
      next.setMonth(next.getMonth() + 1);

      const diffDays = Math.ceil(
        (next.getTime() - Date.now()) / 86400000
      );

      if (diffDays <= 3) {
        for (const d of ownerDevices) {
          await sendPush(
            d.fcm_token,
            "Hora de baño 🛁",
            `${pet.name} necesita baño pronto`
          );
        }
      }
    }
  }

  return new Response("push sent");
});