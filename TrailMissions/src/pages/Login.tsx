import { IonPage, IonContent } from "@ionic/react";
import { useHistory } from "react-router";
import { useState } from "react";

import {
  loginAnon,
  getUserData
} from "../services/firebase/firebase";

import { useApp } from "../contexts/AppContext";

export default function Login() {
  const history = useHistory();
  const { setUser, setPoints, setMissions } = useApp();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleLogin = async () => {
    setStatus("loading");
    try {
      // loginAnon debe retornar el uid (puedes usar signInAnonymously de Firebase)
      const uid = await loginAnon(); 
      
      // Intentamos recuperar datos existentes para este ID
      const data = await getUserData(uid);
      
      if (data) {
        setPoints(data.points);
        setMissions(data.missions);
        console.log("¡Bienvenido de nuevo!", uid.substring(0, 5));
      } else {
        console.log("Nueva cuenta creada:", uid.substring(0, 5));
      }

      setUser(uid);
      history.replace("/");
    } catch (err) {
      setStatus("error");
      console.error(err);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-white mb-2">TRAIL EXPLORER</h1>
            <p className="text-slate-400">Tus misiones y puntos se guardan en este dispositivo.</p>
          </div>

          <button
            onClick={handleLogin}
            disabled={status === "loading"}
            className="w-full max-w-xs bg-indigo-600 hover:bg-indigo-500 py-4 rounded-2xl font-bold text-white transition-all active:scale-95 disabled:opacity-50"
          >
            {status === "loading" ? "Sincronizando..." : "Empezar Misión"}
          </button>
          
          <p className="mt-4 text-xs text-slate-500 uppercase tracking-widest">
            ID de sesión persistente
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
}