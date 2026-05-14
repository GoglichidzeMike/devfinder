import type { ApiError, GitHubRepo, GitHubUser } from "./types";

const GITHUB_API = "https://api.github.com";

export class GitHubApiError extends Error {
  constructor(public readonly error: ApiError) {
    super(error.message);
  }
}

function buildHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function fetchGitHub<T>(path: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${GITHUB_API}${path}`, {
      headers: buildHeaders(),
      next: { revalidate: 60 },
    });
  } catch {
    throw new GitHubApiError({
      code: "network",
      message: "Network error contacting GitHub",
    });
  }

  if (res.status === 404) {
    throw new GitHubApiError({
      code: "not_found",
      message: "User not found",
      status: 404,
    });
  }

  if (res.status === 403 || res.status === 429) {
    throw new GitHubApiError({
      code: "rate_limited",
      message: process.env.GITHUB_TOKEN
        ? "Rate limited by GitHub"
        : "Rate limited — add GITHUB_TOKEN to .env.local to raise the limit to 5000/hr",
      status: res.status,
    });
  }

  if (!res.ok) {
    throw new GitHubApiError({
      code: "unknown",
      message: `GitHub responded with ${res.status}`,
      status: res.status,
    });
  }

  return (await res.json()) as T;
}

export function fetchUser(username: string) {
  return fetchGitHub<GitHubUser>(`/users/${encodeURIComponent(username)}`);
}

export function fetchRepos(username: string) {
  return fetchGitHub<GitHubRepo[]>(
    `/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
  );
}
