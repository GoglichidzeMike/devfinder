"use client";

import { use, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RepoCard } from "@/components/repo-card";
import { RepoFilters } from "@/components/repo-filters";
import { ErrorState } from "@/components/states/error-state";
import { LoadingState } from "@/components/states/loading-state";
import { useGitHubRepos } from "@/hooks/use-github-repos";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useGitHubUser } from "@/hooks/use-github-suer";

interface UserRepoPageProps {
  params: Promise<{ username: string }>;
}

export default function UserRepoPage({ params }: UserRepoPageProps) {
  const { username } = use(params);
  const userQuery = useGitHubUser(username);
  const reposQuery = useGitHubRepos(username);

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"stars" | "updated">("stars");

  const languages = useMemo(() => {
    if (!reposQuery.data) return [];
    const set = new Set<string>();
    for (const r of reposQuery.data) {
      if (r.language) set.add(r.language);
    }
    return [...set].sort();
  }, [reposQuery.data]);

  const displayed = useMemo(() => {
    if (!reposQuery.data) return [];
    const filtered = selectedLanguage
      ? reposQuery.data.filter((r) => r.language === selectedLanguage)
      : reposQuery.data;

    return [...filtered].sort((a, b) => {
      if (sortBy === "stars") {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
  }, [reposQuery.data, selectedLanguage, sortBy]);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-4 py-10 sm:py-16">
      <header className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to search
        </Link>
        <ThemeToggle />
      </header>

      {userQuery.data && (
        <div className="flex items-center gap-3">
          <Image
            src={userQuery.data.avatar_url}
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 rounded-full"
          />
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              {userQuery.data.name ?? userQuery.data.login}
            </h1>
            <p className="text-sm text-blue-500 dark:text-blue-400">@{userQuery.data.login}</p>
          </div>
        </div>
      )}

      {reposQuery.error && <ErrorState error={reposQuery.error} />}

      {reposQuery.isLoading && (
        <div className="space-y-3">
          <LoadingState />
          <LoadingState />
        </div>
      )}

      {reposQuery.data && (
        <>
          <div className="flex items-center justify-between gap-3">
            <RepoFilters
              languages={languages}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
            <span className="shrink-0 text-xs text-slate-500 dark:text-slate-400">
              {displayed.length} {displayed.length === 1 ? "repo" : "repos"}
            </span>
          </div>

          {displayed.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
              No repositories match this filter.
            </p>
          ) : (
            <div className="space-y-3">
              {displayed.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
