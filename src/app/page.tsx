"use client";

import { useEffect, useState } from "react";
import { SearchBar } from "@/components/search-bar";
import { UserCard } from "@/components/user-card";
import { RecentSearches } from "@/components/recent-searches";
import { ErrorState } from "@/components/states/error-state";
import { LoadingState } from "@/components/states/loading-state";
import { EmptyState } from "@/components/states/empty-state";
import { useRecentSearches } from "@/hooks/use-recent-searches";
import { useGitHubUser } from "@/hooks/use-github-suer";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function HomePage() {
  const [activeUsername, setActiveUsername] = useState("");
  const userQuery = useGitHubUser(activeUsername);
  const { recent, add, clear } = useRecentSearches();

  useEffect(() => {
    if (userQuery.isSuccess) add(userQuery.data.login);
  }, [userQuery.isSuccess, userQuery.data, add]);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-4 py-10 sm:py-16">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">devfinder</h1>
        <ThemeToggle />
      </header>

      <SearchBar onSearch={setActiveUsername} />

      <RecentSearches items={recent} onSelect={setActiveUsername} onClear={clear} />

      {!activeUsername && <EmptyState />}
      {userQuery.isLoading && <LoadingState />}
      {userQuery.error && <ErrorState error={userQuery.error} />}
      {userQuery.data && <UserCard user={userQuery.data} />}
    </main>
  );
}
