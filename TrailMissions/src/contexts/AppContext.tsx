import { createContext, useContext, useState } from "react";
import { logout } from "../services/firebase/firebase";

const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);

  const [missions, setMissions] = useState({
    photo: false,
    move: false,
    still: false
  });

  const completeMission = (id: string, pts: number) => {
    setMissions((prev) => ({
      ...prev,
      [id]: true
    }));

    setPoints((p) => p + pts);
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        points,
        missions,
        completeMission,
        logoutUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);