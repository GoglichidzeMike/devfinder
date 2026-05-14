import Link from "next/link";
import Image from "next/image";
import { Building2, Link as LinkIcon, MapPin, X } from "lucide-react";
import type { GitHubUser } from "@/lib/types";
import { Card } from "./ui/card";
import { DetailRow } from "./ui/detail-row";
import { Stat } from "./ui/stat";

interface UserCardProps {
  user: GitHubUser;
}

export function UserCard({ user }: UserCardProps) {
  const joined = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/user/${user.login}`}
      className="block rounded-2xl transition-transform hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
      aria-label={`View ${user.login}'s repositories`}
    >
      <Card className="space-y-4">
        <div className="flex items-start gap-4">
          <Image
            src={user.avatar_url}
            alt=""
            width={72}
            height={72}
            className="h-18 w-18 shrink-0 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold tracking-tight">{user.name ?? user.login}</h2>
            <p className="text-sm text-blue-500 dark:text-blue-400">@{user.login}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Joined {joined}</p>
          </div>
        </div>

        {user.bio && (
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{user.bio}</p>
        )}

        <dl className="grid grid-cols-3 gap-2 rounded-xl bg-slate-50 px-4 py-3 text-center dark:bg-slate-800/50">
          <Stat label="Repos" value={user.public_repos} />
          <Stat label="Followers" value={user.followers} />
          <Stat label="Following" value={user.following} />
        </dl>

        <div className="space-y-1.5 text-sm">
          {user.location && <DetailRow icon={<MapPin size={16} />}>{user.location}</DetailRow>}
          {user.blog && (
            <DetailRow icon={<LinkIcon size={16} />}>
              <span className="break-all">{user.blog}</span>
            </DetailRow>
          )}
          {user.twitter_username && (
            <DetailRow icon={<X size={16} />}>@{user.twitter_username}</DetailRow>
          )}
          {user.company && <DetailRow icon={<Building2 size={16} />}>{user.company}</DetailRow>}
        </div>
      </Card>
    </Link>
  );
}
