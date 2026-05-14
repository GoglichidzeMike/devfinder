import { GitFork, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LanguageDot } from "@/components/ui/language-dot";
import type { GitHubRepo } from "@/lib/types";

interface RepoCardProps {
  repo: GitHubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <Card>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="-m-1 block rounded-lg p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <h3 className="font-semibold text-blue-500 hover:underline dark:text-blue-400">
          {repo.name}
        </h3>

        {repo.description && (
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{repo.description}</p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <LanguageDot language={repo.language} />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star size={14} aria-hidden="true" />
            {repo.stargazers_count.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <GitFork size={14} aria-hidden="true" />
            {repo.forks_count.toLocaleString()}
          </span>
        </div>
      </a>
    </Card>
  );
}
