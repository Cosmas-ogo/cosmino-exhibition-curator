import { PRESET_TERMS } from "../lib/constants";

export default function PresetChips({ onSelect, active }) {
  const norm = (s) =>
    (s ?? "")
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ")
      .replace(/[^\p{L}\p{N}\s]/gu, "");

  return (
    <div className="mt-3 flex w-full flex-wrap gap-2 justify-center md:justify-between">
      {PRESET_TERMS.map((t) => {
        const a = norm(active);
        const p = norm(t);
        const isActive =
          a === p || (a && p.startsWith(a)) || (a && a.startsWith(p));

        return (
          <button
            key={t}
            type="button"
            onClick={() => onSelect?.(t)}
            aria-current={isActive ? "true" : undefined}
            className={[
              "inline-flex items-center rounded-full px-3 py-1.5 text-[0.95rem] font-medium transition cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
              "focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900",
              isActive
                ? "!bg-indigo-600 !text-white border border-indigo-600 shadow-sm dark:!bg-indigo-500 dark:border-indigo-500"
                : "border border-zinc-300 bg-white text-zinc-900 shadow-sm hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
            ].join(" ")}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}
