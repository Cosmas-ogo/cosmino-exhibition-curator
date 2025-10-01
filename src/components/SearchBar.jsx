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
        <div className="flex items-center gap-2 rounded-2xl border bg-white px-3 py-2">
          <span aria-hidden>🔎</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
            placeholder="Search artworks…"
            className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-500"
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
