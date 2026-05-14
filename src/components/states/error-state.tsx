import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { ApiError } from "@/lib/types";

interface ErrorStateProps {
  error: ApiError;
}

export function ErrorState({ error }: ErrorStateProps) {
  const { title, hint } = describe(error);
  return (
    <Card
      role="alert"
      className="border-2 border-dashed border-rose-300 bg-rose-50/50 text-rose-900 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-100"
    >
      <div className="flex items-start gap-3">
        <AlertCircle size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
        <div className="space-y-1">
          <p className="font-semibold">{title}</p>
          <p className="text-sm opacity-80">{hint}</p>
        </div>
      </div>
    </Card>
  );
}

function describe(error: ApiError): { title: string; hint: string } {
  switch (error.code) {
    case "not_found":
      return {
        title: "No such user",
        hint: "Check the spelling or try a different username.",
      };
    case "rate_limited":
      return {
        title: "Rate limited",
        hint: error.message,
      };
    case "network":
      return {
        title: "Can't reach the server",
        hint: "Check your connection and try again.",
      };
    default:
      return {
        title: "Something went wrong",
        hint: error.message ?? "Unexpected error.",
      };
  }
}
