# devfinder

Search GitHub users, browse their public repos.

## Run it

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

Optional: GitHub token

Without a token, the app gets 60 GitHub API requests per hour. With one, 5000.

GITHUB_TOKEN=your_token_here

Stack:

- Next.js 16
- Tailwind v4
- TanStack Query + localStorage persistence

Layout
```
src/
├── app/         routes (pages + route handlers)
├── providers/   global context (query client, theme)
├── components/  UI (ui/ = primitives, states/ = loading/error/empty)
├── hooks/       data hooks + small utilities
└── lib/         types, fetchers, query keys, helpers
```
