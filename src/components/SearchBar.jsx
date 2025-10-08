import { useState } from "react";

export default function SearchBar({ defaultValue = "", onSubmit }) {
  const [q, setQ] = useState(defaultValue);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = q.trim();
    if (trimmed) onSubmit?.(trimmed);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label className="block">
        <span className="sr-only">Search artworks</span>
        <div className="flex items-center gap-2 rounded-2xl border px-3 py-2 border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900">
          <span aria-hidden>🔎</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
            placeholder="Search artworks…"
            className="w-full bg-transparent outline-none placeholder-zinc-400 text-zinc-900 dark:text-zinc-100"
            aria-label="Search artworks"
          />
          <button
            className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-50"
            type="submit"
          >
            Search
          </button>
        </div>
      </label>
    </form>
  );
}
