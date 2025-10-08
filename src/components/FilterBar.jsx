export default function FilterBar({
  includeAic,
  includeCma,
  onChangeSource,
  sort,
  onChangeSort,
}) {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
      <fieldset className="flex items-center gap-2">
        <legend className="mr-2 text-sm text-gray-600 dark:text-gray-300 cursor-default">
          Sources
        </legend>

        <label className="inline-flex items-center gap-1 text-sm cursor-pointer select-none">
          <input
            type="checkbox"
            checked={includeAic}
            onChange={(e) =>
              onChangeSource?.({ source: "aic", value: e.target.checked })
            }
            className="cursor-pointer"
          />
          AIC
        </label>

        <label className="inline-flex items-center gap-1 text-sm cursor-pointer select-none">
          <input
            type="checkbox"
            checked={includeCma}
            onChange={(e) =>
              onChangeSource?.({ source: "cma", value: e.target.checked })
            }
            className="cursor-pointer"
          />
          CMA
        </label>
      </fieldset>

      <label className="ml-auto text-sm cursor-pointer">
        <span className="mr-2 text-gray-600 dark:text-gray-300">Sort</span>
        <select
          value={sort}
          onChange={(e) => onChangeSort?.(e.target.value)}
          className="cursor-pointer rounded-lg border border-gray-500 bg-white px-2 py-1
                     dark:border-gray-400 dark:bg-gray-900 dark:text-gray-100
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
          aria-label="Sort results"
        >
          <option value="title">Title (A–Z)</option>
          <option value="artist">Artist (A–Z)</option>
        </select>
      </label>
    </div>
  );
}
