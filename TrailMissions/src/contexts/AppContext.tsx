import { createContext, useContext, useState, useEffect } from "react";
import { logout, updateUserProgress, auth, getUserData } from "../services/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: any) => {
  const [user, setUser] = useState<string | null>(null);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true); // Estado para evitar parpadeos
  const [missions, setMissions] = useState({ photo: false, move: false, still: false });

  const completeMission = async (id: string, pts: number) => {
    if (!user) return;

    const newPoints = points + pts;

    setMissions(prev => ({
      ...prev,
      [id]: true
    }));

    setPoints(newPoints);

    await updateUserProgress(user, id, newPoints);
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
    setPoints(0);

    setMissions({
      photo: false,
      move: false,
      still: false
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const uid = firebaseUser.uid;
        setUser(uid);
        const data = await getUserData(uid);
        if (data) {
          setPoints(data.points || 0);
          setMissions(data.missions || { photo: false, move: false, still: false });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        points,
        setPoints,
        missions,
        setMissions,
        completeMission,
        logoutUser
      }}
    >
      {!loading && children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);