import { Link } from "react-router-dom";
import { useExhibition } from "../context/ExhibitionContext";

export default function ExhibitionTray() {
  const { state } = useExhibition();
  const count = state.items.length;
  if (!count) return null;

  return (
    <div className="sticky bottom-3 z-30 mx-3 mt-6">
      <div className="mx-auto max-w-screen-xl 2xl:max-w-screen-2xl rounded-2xl border bg-white px-4 py-3 shadow">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            My Exhibition: <strong>{count}</strong> items
          </div>
          <Link
            to="/exhibition"
            className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-50"
          >
            Open ▶
          </Link>
        </div>
      </div>
    </div>
  );
}
