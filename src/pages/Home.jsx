import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";
import PresetChips from "../components/PresetChips";
import FilterBar from "../components/FilterBar";
import ResultsGrid from "../components/ResultsGrid";
import ExhibitionTray from "../components/ExhibitionTray";
import ArtworkModal from "../components/ArtworkModal";
import { useExhibition } from "../context/ExhibitionContext";

function useQueryParam(name) {
  const location = useLocation();
  return new URLSearchParams(location.search).get(name);
}

export default function Home() {
  const navigate = useNavigate();
  const initialQ = useQueryParam("q") || "";
  const [includeAic, setIncludeAic] = useState(true);
  const [includeCma, setIncludeCma] = useState(true);
  const [sort, setSort] = useState("title");

  const { data, isLoading, isError } = useSearch(initialQ, {
    includeAic,
    includeCma,
  });

  const items = useMemo(() => {
    if (!data) return [];
    if (sort === "artist") {
      return [...data].sort((a, b) =>
        (a.artist || "").localeCompare(b.artist || "")
      );
    }
    return data;
  }, [data, sort]);

  const [openId, setOpenId] = useState(null);
  const { dispatch } = useExhibition();

  function openDetails(item) {
    setOpenId(item.id);
    window.history.pushState(
      {},
      "",
      `/?q=${encodeURIComponent(initialQ)}&art=${encodeURIComponent(item.id)}`
    );
  }

  function closeDetails() {
    setOpenId(null);
    window.history.pushState({}, "", `/?q=${encodeURIComponent(initialQ)}`);
  }

  function onPresetSelect(term) {
    navigate(`/?q=${encodeURIComponent(term)}`);
  }

  return (
    <main className="mx-auto max-w-screen-2xl px-3 py-6">
      <div
        className="sticky top-[72px] z-30 bg-white/80 backdrop-blur border-b
                      border-zinc-200 dark:bg-zinc-950/80 dark:border-zinc-800"
      >
        <PresetChips onSelect={onPresetSelect} active={initialQ.trim()} />
        <FilterBar
          includeAic={includeAic}
          includeCma={includeCma}
          onChangeSource={({ source, value }) => {
            if (source === "aic") setIncludeAic(value);
            if (source === "cma") setIncludeCma(value);
          }}
          sort={sort}
          onChangeSort={setSort}
        />
      </div>

      {initialQ ? (
        <ResultsGrid
          items={items}
          isLoading={isLoading}
          isError={isError}
          onOpen={openDetails}
          onAdd={(item) => dispatch({ type: "add", item })}
        />
      ) : (
        <div className="mt-10 text-center text-sm text-gray-500">
          Start by typing a search term or pick a preset above.
        </div>
      )}

      <ExhibitionTray />
      {openId && <ArtworkModal compositeId={openId} onClose={closeDetails} />}
    </main>
  );
}
