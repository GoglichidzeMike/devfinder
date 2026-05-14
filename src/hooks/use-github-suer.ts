import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/lib/github";
import { queryKeys } from "@/lib/query-keys";
import type { ApiError, GitHubUser } from "@/lib/types";

export function useGitHubUser(username: string) {
  const trimmed = username.trim();

  return useQuery<GitHubUser, ApiError>({
    queryKey: queryKeys.user(trimmed),
    queryFn: () => fetchUser(trimmed),
    enabled: trimmed.length > 0,
    retry: (failureCount, error) => {
      if (error.code === "not_found" || error.code === "rate_limited") return false;
      return failureCount < 1;
    },
  });
}
