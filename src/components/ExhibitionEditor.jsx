import { useExhibition } from "../context/ExhibitionContext";

export default function ExhibitionEditor() {
  const { state, dispatch } = useExhibition();

  function move(index, delta) {
    const to = index + delta;
    if (to < 0 || to >= state.items.length) return;
    dispatch({ type: "move", from: index, to });
  }

  return (
    <div>
      <div className="grid gap-2 md:grid-cols-2">
        <label className="block">
          <div className="text-sm text-gray-600">Title</div>
          <input
            className="mt-1 w-full rounded-xl border px-3 py-2"
            value={state.meta.title}
            onChange={(e) =>
              dispatch({ type: "meta", meta: { title: e.target.value } })
            }
            placeholder="Untitled Exhibition"
          />
        </label>
        <label className="block">
          <div className="text-sm text-gray-600">Description</div>
          <textarea
            className="mt-1 w-full rounded-xl border px-3 py-2"
            rows={3}
            value={state.meta.description}
            onChange={(e) =>
              dispatch({ type: "meta", meta: { description: e.target.value } })
            }
            placeholder="Optional notes about your selection…"
          />
        </label>
      </div>

      {!state.items.length ? (
        <div className="mt-6 text-sm text-gray-600">
          You haven’t added any artworks yet.
        </div>
      ) : (
        <ol className="mt-6 space-y-3">
          {state.items.map((it, i) => (
            <li
              key={it.id}
              className="flex items-center gap-3 rounded-2xl border p-2"
            >
              <span className="w-6 shrink-0 text-center text-sm text-gray-500">
                {i + 1}.
              </span>
              <div className="h-16 w-24 overflow-hidden rounded-lg bg-gray-100">
                {it.imageThumb ? (
                  <img
                    src={it.imageThumb}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-xs text-gray-500">
                    No image
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{it.title}</div>
                <div className="truncate text-sm text-gray-600">
                  {it.artist}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  className="rounded-lg border px-2 py-1 text-sm hover:bg-gray-50"
                  onClick={() => move(i, -1)}
                  aria-label="Move up"
                >
                  ↑
                </button>
                <button
                  className="rounded-lg border px-2 py-1 text-sm hover:bg-gray-50"
                  onClick={() => move(i, +1)}
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button
                  className="rounded-lg border px-2 py-1 text-sm hover:bg-gray-50"
                  onClick={() => dispatch({ type: "remove", id: it.id })}
                  aria-label="Remove"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-50"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Present ▶
        </button>
        <button
          className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-50"
          onClick={() => dispatch({ type: "clear" })}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
