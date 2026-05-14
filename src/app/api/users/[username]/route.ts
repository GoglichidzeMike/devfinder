import { NextResponse } from "next/server";
import { fetchUser, GitHubApiError } from "@/lib/github-server";

export async function GET(_req: Request, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  if (!username || username.length > 39) {
    return NextResponse.json(
      { code: "not_found", message: "Invalid username" } satisfies {
        code: string;
        message: string;
      },
      { status: 400 },
    );
  }

  try {
    const user = await fetchUser(username);
    return NextResponse.json(user);
  } catch (err) {
    if (err instanceof GitHubApiError) {
      return NextResponse.json(err.error, { status: err.error.status ?? 500 });
    }
    return NextResponse.json({ code: "unknown", message: "Unexpected error" }, { status: 500 });
  }
}
