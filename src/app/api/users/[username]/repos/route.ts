import { NextResponse } from "next/server";
import { fetchRepos, GitHubApiError } from "@/lib/github-server";

export async function GET(_req: Request, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  try {
    const repos = await fetchRepos(username);
    return NextResponse.json(repos);
  } catch (err) {
    if (err instanceof GitHubApiError) {
      return NextResponse.json(err.error, { status: err.error.status ?? 500 });
    }
    return NextResponse.json({ code: "unknown", message: "Unexpected error" }, { status: 500 });
  }
}
