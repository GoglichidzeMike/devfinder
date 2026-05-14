import { languageColor } from "@/lib/language-colors";

interface LanguageDotProps {
  language: string;
}

export function LanguageDot({ language }: LanguageDotProps) {
  return (
    <span
      className="inline-block h-2.5 w-2.5 rounded-full"
      style={{ backgroundColor: languageColor(language) }}
      aria-hidden="true"
    />
  );
}
