import type { ApiError, GitHubRepo, GitHubUser } from "./types";

async function getJSON<T>(path: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(path);
  } catch {
    throw {
      code: "network",
      message: "Could not reach the server",
    } satisfies ApiError;
  }

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as ApiError | null;
    throw (body ?? {
      code: "unknown",
      message: `Request failed with ${res.status}`,
      status: res.status,
    }) satisfies ApiError;
  }

  return (await res.json()) as T;
}

export function fetchUser(username: string) {
  return getJSON<GitHubUser>(`/api/users/${encodeURIComponent(username)}`);
}

export function fetchRepos(username: string) {
  return getJSON<GitHubRepo[]>(`/api/users/${encodeURIComponent(username)}/repos`);
}
