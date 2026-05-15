import { Church } from "lucide-react";

export function ImagePlaceholder({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 text-primary/60 ${className}`}
    >
      <div className="flex flex-col items-center gap-2">
        <Church className="h-10 w-10" strokeWidth={1.2} />
        {label && <span className="text-xs uppercase tracking-widest">{label}</span>}
      </div>
    </div>
  );
}
