import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white p-6 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.08)]",
        "dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800",
        className,
      )}
      {...props}
    />
  );
}
