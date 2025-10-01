export default function MetadataList({ item }) {
  const rows = [
    ["Medium", item.medium],
    ["Culture", item.culture],
    ["Department", item.department],
    ["On view", item.onViewHint],
    ["Museum", item.museum],
  ].filter(([, v]) => v);

  if (!rows.length) return null;

  return (
    <dl className="mt-3 grid grid-cols-3 gap-y-2 text-sm">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-gray-600">{k}</dt>
          <dd className="col-span-2">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
