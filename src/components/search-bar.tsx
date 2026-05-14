"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { Card } from "./ui/card";

interface SearchBarProps {
  onSearch: (username: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState("");
  const debounced = useDebouncedValue(input, 400);

  useEffect(() => {
    onSearch(debounced.trim());
  }, [debounced, onSearch]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSearch(input.trim());
  }

  return (
    <Card className="p-2">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Search className="ml-2 shrink-0 text-blue-500" size={20} aria-hidden="true" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search GitHub username..."
          aria-label="GitHub username"
          autoComplete="off"
          spellCheck={false}
          className="flex-1 bg-transparent px-2 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
        />
        <Button type="submit" disabled={!input.trim()}>
          Search
        </Button>
      </form>
    </Card>
  );
}
