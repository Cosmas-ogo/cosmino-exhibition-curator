import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useArtwork } from "../hooks/useArtwork";
import HeroImage from "./HeroImage";
import MetadataList from "./MetadataList";
import { useExhibition } from "../context/ExhibitionContext";

export default function ArtworkModal({ compositeId, onClose }) {
  const { data, isLoading, isError, error } = useArtwork(compositeId);
  const { state, dispatch } = useExhibition();
  const isInExhibition = state.items.some((i) => i.id === compositeId);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className="absolute inset-x-0 top-10 mx-auto max-h-[80vh] w-[min(900px,92vw)] overflow-auto rounded-2xl bg-white p-4 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold">Artwork details</h2>
          <button
            className="rounded-lg border px-2 py-1 text-sm hover:bg-gray-50 text-slate-900 dark:text-slate-900"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {isLoading && (
          <div className="mt-4 h-40 animate-pulse rounded-xl bg-gray-100" />
        )}
        {isError && (
          <div
            role="alert"
            className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-red-800"
          >
            Failed to load: {error?.message}
          </div>
        )}
        {data && (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <HeroImage
              src={data.imageFull || data.imageThumb}
              alt={`${data.title} by ${data.artist}`}
            />
            <div>
              <h3 className="text-xl font-semibold">{data.title}</h3>
              <p className="text-gray-700">{data.artist}</p>
              {data.dateText && (
                <p className="text-sm text-gray-600">{data.dateText}</p>
              )}

              <MetadataList item={data} />

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {!isInExhibition ? (
                  <button
                    className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-50"
                    onClick={() => dispatch({ type: "add", item: data })}
                  >
                    Add to Exhibition
                  </button>
                ) : (
                  <button
                    className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-50"
                    onClick={() => dispatch({ type: "remove", id: data.id })}
                  >
                    Remove from Exhibition
                  </button>
                )}

                {data.link && (
                  <a
                    href={data.link}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-50"
                  >
                    View at {data.museum}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
