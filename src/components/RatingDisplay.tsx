interface RatingDisplayProps {
  value: number;
  max?: number;
}

export default function RatingDisplay({ value, max = 10 }: RatingDisplayProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-serif tracking-[0.25em] text-sm text-gray-800 uppercase whitespace-nowrap">
        Meine Bewertung
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-gray-300 via-gray-300 to-transparent" />
      <span className="font-serif leading-none whitespace-nowrap">
        <span className="text-4xl font-bold text-[#8a1a0a]">{value}</span>
        <span className="text-2xl text-gray-400">/{max}</span>
      </span>
    </div>
  );
}
