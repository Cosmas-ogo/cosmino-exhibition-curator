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
  const [includeMet, setIncludeMet] = useState(true);
  const [includeCma, setIncludeCma] = useState(true);
  const [sort, setSort] = useState("title");

  const { data, isLoading, isError } = useSearch(initialQ, {
    includeMet,
    includeCma,
  });
  const items = useMemo(() => {
    if (!data) return [];
    if (sort === "artist") {
      return [...data].sort((a, b) =>
        (a.artist || "").localeCompare(b.artist || "")
      );
    }
    return data; // already title-sorted in hook
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
    <main className="mx-auto max-w-6xl px-3 py-4">
      <PresetChips onSelect={onPresetSelect} />
      <FilterBar
        includeMet={includeMet}
        includeCma={includeCma}
        onChangeSource={({ source, value }) => {
          if (source === "met") setIncludeMet(value);
          if (source === "cma") setIncludeCma(value);
        }}
        sort={sort}
        onChangeSort={setSort}
      />
      <ResultsGrid
        items={items}
        isLoading={isLoading && !!initialQ}
        isError={isError}
        onOpen={openDetails}
        onAdd={(item) => dispatch({ type: "add", item })}
      />
      <ExhibitionTray />

      {openId && <ArtworkModal compositeId={openId} onClose={closeDetails} />}
    </main>
  );
}
