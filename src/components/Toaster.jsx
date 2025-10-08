import { useEffect, useState } from "react";

let idCounter = 0;

export function showToast(message, type = "info", duration = 3000) {
  window.dispatchEvent(
    new CustomEvent("app:toast", {
      detail: { id: ++idCounter, message, type, duration },
    })
  );
}

export default function Toaster() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    function onToast(e) {
      const t = e.detail;
      setItems((prev) => [...prev, t]);
      setTimeout(() => {
        setItems((prev) => prev.filter((x) => x.id !== t.id));
      }, t.duration ?? 3000);
    }
    window.addEventListener("app:toast", onToast);
    return () => window.removeEventListener("app:toast", onToast);
  }, []);

  return (
    <>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {items.length ? items[items.length - 1].message : ""}
      </div>

      <div className="pointer-events-none fixed inset-x-0 top-16 z-50 flex flex-col items-center gap-2">
        {items.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto rounded-xl border bg-white px-3 py-2 shadow ${
              t.type === "error" ? "border-red-300" : "border-gray-200"
            }`}
            role="status"
          >
            <span
              className={t.type === "error" ? "text-red-700" : "text-gray-700"}
            >
              {t.message}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
