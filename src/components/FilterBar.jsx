export default function FilterBar({
  includeMet,
  includeCma,
  onChangeSource,
  sort,
  onChangeSort,
}) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-3">
      <fieldset className="flex items-center gap-2">
        <legend className="mr-2 text-sm text-gray-600">Sources</legend>
        <label className="inline-flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={includeMet}
            onChange={(e) =>
              onChangeSource?.({ source: "met", value: e.target.checked })
            }
          />
          Met
        </label>
        <label className="inline-flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={includeCma}
            onChange={(e) =>
              onChangeSource?.({ source: "cma", value: e.target.checked })
            }
          />
          CMA
        </label>
      </fieldset>

      <label className="ml-auto text-sm">
        <span className="mr-2 text-gray-600">Sort</span>
        <select
          value={sort}
          onChange={(e) => onChangeSort?.(e.target.value)}
          className="rounded-lg border bg-white px-2 py-1"
          aria-label="Sort results"
        >
          <option value="title">Title (A–Z)</option>
          <option value="artist">Artist (A–Z)</option>
        </select>
      </label>
    </div>
  );
}
