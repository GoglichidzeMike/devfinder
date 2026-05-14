export const queryKeys = {
  user: (username: string) => ["user", username.toLowerCase()] as const,
  repos: (username: string) => ["repos", username.toLowerCase()] as const,
};
