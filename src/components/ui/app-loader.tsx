import { Loader2 } from "lucide-react";

export function AppLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-700 bg-opacity-90 z-50">
      <Loader2 className="w-10 h-10 text-slate-200 animate-spin" />
    </div>
  );
}
