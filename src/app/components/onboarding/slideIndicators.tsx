export default function SlideIndicators({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-[4px] w-[24px] rounded-full transition-all ${
            i === current ? "bg-[#FF642F]" : "bg-[#F3E9B5]"
          }`}
        />
      ))}
    </div>
  );
}
