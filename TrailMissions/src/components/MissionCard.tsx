import { Camera, Move, UserCheck, Star, CheckCircle } from 'lucide-react';

interface MissionCardProps {
  title: string;
  points: number;
  type: string; // Recibe "photo", "move" o "still"
  completed: boolean;
  onClick: () => void;
}

export default function MissionCard({
  title,
  points,
  type,
  completed,
  onClick
}: MissionCardProps) {
  
  const getIcon = () => {
    switch (type) {
      case 'photo': return <Camera size={40} />;
      case 'move': return <Move size={40} />;
      case 'still': return <UserCheck size={40} />;
      default: return <Star size={40} />;
    }
  };

  return (
    <div className={`p-6 rounded-[2rem] border transition-all duration-300 ${
      completed 
        ? 'bg-slate-900/40 border-green-500/30 opacity-80' 
        : 'bg-[#0f172a] border-slate-800 shadow-xl'
    }`}>
      <div className="flex flex-col items-center text-center">
        
        {/* Contenedor del Icono con efecto Glow */}
        <div className={`relative mb-4 p-4 rounded-2xl ${
          completed ? 'text-green-400' : 'text-indigo-400 bg-slate-800/50'
        }`}>
          {completed ? <CheckCircle size={48} /> : getIcon()}
          {!completed && (
             <div className="absolute inset-0 bg-indigo-500/5 blur-xl rounded-full"></div>
          )}
        </div>

        <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
        
        <div className="my-3">
          <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border ${
            completed 
              ? 'bg-green-900/20 text-green-500 border-green-500/50' 
              : 'bg-orange-900/20 text-orange-500 border-orange-500/50'
          }`}>
            {completed ? 'COMPLETADA' : 'PENDIENTE'}
          </span>
        </div>

        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          {type === 'photo' && "Captura una evidencia visual."}
          {type === 'move' && "Detecta movimiento de 30 a 50 metros."}
          {type === 'still' && "Mantén la posición por 10 segundos."}
        </p>

        {/* Footer: Puntos y Botón */}
        <div className="flex items-center justify-between w-full mt-2">
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="text-white font-bold text-xs">+{points} PTS</span>
          </div>

          {!completed && (
            <button
              onClick={onClick}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-transform active:scale-95 shadow-lg shadow-indigo-900/40"
            >
              Start
            </button>
          )}
        </div>
      </div>
    </div>
  );
}