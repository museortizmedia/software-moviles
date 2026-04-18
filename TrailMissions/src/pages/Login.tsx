import {
  IonPage,
  IonContent
} from "@ionic/react";

import { useHistory } from "react-router";
import { loginAnon } from "../services/firebase/firebase";
import { useApp } from "../contexts/AppContext";

export default function Login() {
  const history = useHistory();
  const { setUser } = useApp();

  const handleAnon = async () => {
    const uid = await loginAnon();

    setUser(uid);

    history.replace("/");
  };

  return (
    <IonPage>
      <IonContent fullscreen>

        <div className="
        min-h-screen
        bg-slate-950
        flex
        flex-col
        justify-center
        items-center
        text-white
        ">

          <h1 className="text-3xl font-bold mb-6">
            Trail Missions
          </h1>

          <button
            onClick={handleAnon}
            className="
            bg-indigo-600
            px-6
            py-3
            rounded-xl
            text-lg
            "
          >
            Entrar anónimo
          </button>

        </div>

      </IonContent>
    </IonPage>
  );
}