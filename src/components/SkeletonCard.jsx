export default function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/3] rounded-2xl bg-gray-100" />
      <div className="mt-2 h-4 w-3/4 rounded bg-gray-100" />
      <div className="mt-1 h-3 w-1/2 rounded bg-gray-100" />
    </div>
  );
}
