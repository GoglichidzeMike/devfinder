import { Card } from "@/components/ui/card";

export function LoadingState() {
  return (
    <Card className="space-y-4" aria-busy="true" aria-live="polite">
      <div className="flex items-start gap-4">
        <div className="h-18 w-18 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
      <div className="h-12 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800/50" />
    </Card>
  );
}
