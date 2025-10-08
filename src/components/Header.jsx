import { Link, useNavigate, useLocation } from "react-router-dom";
import { useExhibition } from "../context/ExhibitionContext";
import SearchBar from "./SearchBar";

export default function Header() {
  const { state } = useExhibition();
  const count = state.items.length;
  const navigate = useNavigate();
  const location = useLocation();

  const currentQuery = new URLSearchParams(location.search).get("q") || "";

  function onSubmit(q) {
    navigate(`/?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur border-zinc-200 dark:bg-zinc-950/80 dark:border-zinc-800">
      <div className="mx-auto flex max-w-screen-xl 2xl:max-w-screen-2xl items-center gap-3 px-3 py-3">
        <Link
          to="/"
          className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          Exhibition Curator
        </Link>
        <div className="flex-1">
          <SearchBar defaultValue={currentQuery} onSubmit={onSubmit} />
        </div>
        <Link
          to="/exhibition"
          className="rounded-full border px-3 py-1 text-sm border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
          aria-label={`Open My Exhibition (${count} items)`}
        >
          My Exhibition ({count})
        </Link>
      </div>
    </header>
  );
}
