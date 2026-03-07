import { Loader2 } from "lucide-react";

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <Loader2 className="w-10 h-10 animate-spin text-white" />
    </div>
  );
}