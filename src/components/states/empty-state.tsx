import { Search } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-2 py-8 text-center text-slate-500 dark:text-slate-400">
      <Search size={32} className="opacity-40" aria-hidden="true" />
      <p className="text-sm">Search for a GitHub username to get started.</p>
    </div>
  );
}
