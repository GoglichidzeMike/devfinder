import { useQuery } from "@tanstack/react-query";
import { fetchRepos } from "@/lib/github";
import { queryKeys } from "@/lib/query-keys";
import type { ApiError, GitHubRepo } from "@/lib/types";

export function useGitHubRepos(username: string) {
  const trimmed = username.trim();

  return useQuery<GitHubRepo[], ApiError>({
    queryKey: queryKeys.repos(trimmed),
    queryFn: () => fetchRepos(trimmed),
    enabled: trimmed.length > 0,
    retry: (failureCount, error) => {
      if (error.code === "not_found" || error.code === "rate_limited") return false;
      return failureCount < 1;
    },
  });
}
