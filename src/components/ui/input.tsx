import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm",
        "placeholder:text-slate-400",
        "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none",
        "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100",
        "dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20",
        className,
      )}
      {...props}
    />
  );
}
