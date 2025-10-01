import { PRESET_TERMS } from "../lib/constants";

export default function PresetChips({ onSelect }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {PRESET_TERMS.map((t) => (
        <button
          key={t}
          onClick={() => onSelect?.(t)}
          className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50"
        >
          {t}
        </button>
      ))}
    </div>
  );
}
