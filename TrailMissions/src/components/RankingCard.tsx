import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter
} from "firebase/firestore";

import { db } from "../services/firebase/firebase";
import { useApp } from "../contexts/AppContext";

export default function RankingCard() {

  const { user } = useApp();

  const [ranking, setRanking] = useState<any[]>([]);
  const [lastDoc, setLastDoc] = useState<any>(null);

  const loadRanking = async (first = false) => {

    if (!first && !lastDoc) return;

    try {
      const q = first
        ? query(
          collection(db, "users"),
          orderBy("points", "desc"),
          orderBy("updatedAt", "asc"),
          limit(5)
        )
        : query(
          collection(db, "users"),
          orderBy("points", "desc"),
          orderBy("updatedAt", "asc"),
          startAfter(lastDoc),
          limit(5)
        );

      const snap = await getDocs(q);

      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setLastDoc(snap.docs[snap.docs.length - 1]);

      setRanking(prev =>
        first ? data : [...prev, ...data]
      );
    } catch (error) {
      console.error("Error cargando ranking:", error);
    }
  };

  useEffect(() => {
    loadRanking(true);
  }, []);

  return (
    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 mx-4 mt-4">

      <h3 className="mb-3 font-semibold">
        Ranking
      </h3>

      <div className="space-y-2">

        {ranking.map((r, i) => {

          const isMe = r.id === user;

          return (
            <div
              key={r.id}
              className="flex justify-between"
            >
              <span>
                #{i + 1} {isMe ? "Tú" : "USER-" + r.id.slice(0, 4)}
              </span>

              <span
                className={
                  isMe
                    ? "text-indigo-400 font-semibold"
                    : ""
                }
              >
                {r.points}
              </span>
            </div>
          );
        })}

      </div>

      <button
        onClick={() => loadRanking(false)}
        className="
        w-full
        mt-3
        bg-slate-800
        py-2
        rounded-xl
        text-sm
        "
      >
        Cargar más
      </button>

    </div>
  );
}