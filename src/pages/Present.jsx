import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExhibition } from "../context/ExhibitionContext";

export default function Present() {
  const { state } = useExhibition();
  const navigate = useNavigate();
  const items = state.items;
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!items.length) navigate("/exhibition");
  }, [items.length, navigate]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowRight" || e.key === " ") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") navigate("/exhibition");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i]);

  if (!items.length) return null;
  const cur = items[i];

  function next() {
    setI((v) => (v + 1) % items.length);
  }
  function prev() {
    setI((v) => (v - 1 + items.length) % items.length);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black text-white">
      <div
        className="absolute inset-0 grid place-items-center p-4"
        onClick={next}
      >
        <figure className="max-w-6xl w-full">
          {cur.imageFull || cur.imageThumb ? (
            <img
              src={cur.imageFull || cur.imageThumb}
              alt={`${cur.title} by ${cur.artist}`}
              className="mx-auto max-h-[72vh] w-auto rounded-xl object-contain"
            />
          ) : (
            <div className="mx-auto grid h-[60vh] w-full place-items-center rounded-xl bg-neutral-800">
              No image
            </div>
          )}
          <figcaption className="mt-6 text-center">
            <div className="text-2xl font-semibold">{cur.title}</div>
            <div className="mt-1 text-lg opacity-90">
              {cur.artist}
              {cur.dateText ? ` · ${cur.dateText}` : ""}
            </div>
            <div className="mt-1 text-sm opacity-75">{cur.museum}</div>
          </figcaption>
        </figure>
      </div>

      <div className="absolute left-0 top-1/2 -translate-y-1/2 p-4">
        <button
          onClick={prev}
          className="rounded-xl border border-white/30 px-3 py-1.5"
        >
          ← Prev
        </button>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 p-4">
        <button
          onClick={next}
          className="rounded-xl border border-white/30 px-3 py-1.5"
        >
          Next →
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm opacity-70">
        {i + 1} / {items.length} · ESC to exit
      </div>
    </div>
  );
}
