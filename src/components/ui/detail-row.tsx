import type { ReactNode } from "react";

interface DetailRowProps {
  icon: ReactNode;
  children: ReactNode;
}

export function DetailRow({ icon, children }: DetailRowProps) {
  return (
    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
      <span className="shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true">
        {icon}
      </span>
      <span className="min-w-0 truncate">{children}</span>
    </div>
  );
}
