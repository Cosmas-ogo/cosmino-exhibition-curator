export default function HeroImage({ src, alt }) {
  if (!src) {
    return <div className="aspect-square w-full rounded-xl bg-gray-100" />;
  }
  return (
    <div className="w-full">
      <img
        src={src}
        alt={alt}
        loading="eager"
        className="h-auto w-full rounded-xl object-contain"
        style={{ maxHeight: "60vh" }}
      />
    </div>
  );
}
