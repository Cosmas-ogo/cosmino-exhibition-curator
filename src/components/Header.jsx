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
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-3 py-3">
        <Link to="/" className="font-semibold tracking-tight text-gray-900">
          Exhibition Curator
        </Link>
        <div className="flex-1">
          <SearchBar defaultValue={currentQuery} onSubmit={onSubmit} />
        </div>
        <Link
          to="/exhibition"
          className="rounded-full border-gray-300 px-3 py-1 text-sm hover:bg-gray-100"
          aria-label={`Open My Exhibition (${count} items)`}
        >
          My Exhibition ({count})
        </Link>
      </div>
    </header>
  );
}
