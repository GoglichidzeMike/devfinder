import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "devfinder-recent-searches";
const STORAGE_EVENT = "devfinder:recent-searches";
const MAX_ENTRIES = 5;

const EMPTY: string[] = [];

let cachedRaw: string | null = null;
let cachedSnapshot: string[] = EMPTY;

function parse(raw: string | null): string[] {
  if (!raw) return EMPTY;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    return parsed.filter((x): x is string => typeof x === "string").slice(0, MAX_ENTRIES);
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): string[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedSnapshot;
  cachedRaw = raw;
  cachedSnapshot = parse(raw);
  return cachedSnapshot;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener(STORAGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(STORAGE_EVENT, callback);
  };
}

function notify() {
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

export function useRecentSearches() {
  const recent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const add = useCallback((username: string) => {
    const normalized = username.trim().toLowerCase();
    if (!normalized) return;
    const current = parse(window.localStorage.getItem(STORAGE_KEY));
    const next = [normalized, ...current.filter((u) => u !== normalized)].slice(0, MAX_ENTRIES);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    notify();
  }, []);

  const clear = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    notify();
  }, []);

  return { recent, add, clear };
}
