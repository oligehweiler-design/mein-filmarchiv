import { filmstreifenSrc } from '../assets/filmstreifen';

interface RatingStripProps {
  value: number;
  onChange?: (v: number) => void;
  size?: 'sm' | 'lg';
}

const N = 10;

const FIELD_TOP = 22;
const FIELD_HEIGHT = 56;

export default function RatingStrip({ value, onChange, size = 'lg' }: RatingStripProps) {
  const interactive = !!onChange;
  const maxW = size === 'lg' ? 'max-w-[560px]' : 'max-w-[280px]';
  const textSize = size === 'lg' ? 'text-xl' : 'text-xs';

  return (
    <div className={`relative w-full ${maxW} select-none`}>
      <img
        src={filmstreifenSrc}
        alt="Bewertungsstreifen"
        className="w-full h-auto block pointer-events-none"
        draggable={false}
      />

      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${N}, 1fr)`,
          top: `${FIELD_TOP}%`,
          height: `${FIELD_HEIGHT}%`,
        }}
      >
        {Array.from({ length: N }, (_, i) => i + 1).map((n) => {
          const active = n <= value;
          return (
            <button
              key={n}
              type="button"
              disabled={!interactive}
              onClick={() => onChange?.(n)}
              aria-label={`Bewertung ${n} von ${N}`}
              className={`flex items-center justify-center font-bold ${textSize} transition-all duration-150 ${
                active
                  ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'
                  : 'text-transparent'
              } ${interactive ? 'hover:bg-white/10 cursor-pointer' : ''}`}
            >
              {active ? n : ''}
            </button>
          );
        })}
      </div>
    </div>
  );
}
