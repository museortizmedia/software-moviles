import { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: any) => {
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

  return (
    <AppContext.Provider
      value={{
        points,
        missions,
        completeMission
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);