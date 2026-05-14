"use client";

interface RepoFiltersProps {
  languages: string[];
  selectedLanguage: string | null;
  onLanguageChange: (lang: string | null) => void;
  sortBy: "stars" | "updated";
  onSortChange: (sort: "stars" | "updated") => void;
}

export function RepoFilters({
  languages,
  selectedLanguage,
  onLanguageChange,
  sortBy,
  onSortChange,
}: RepoFiltersProps) {
  const selectClass =
    "rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="flex items-center gap-2 text-sm">
        <span className="text-slate-500 dark:text-slate-400">Language</span>
        <select
          value={selectedLanguage ?? ""}
          onChange={(e) => onLanguageChange(e.target.value || null)}
          className={selectClass}
          aria-label="Filter by language"
        >
          <option value="">All</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2 text-sm">
        <span className="text-slate-500 dark:text-slate-400">Sort by</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as "stars" | "updated")}
          className={selectClass}
          aria-label="Sort repositories"
        >
          <option value="stars">Most starred</option>
          <option value="updated">Recently updated</option>
        </select>
      </label>
    </div>
  );
}
