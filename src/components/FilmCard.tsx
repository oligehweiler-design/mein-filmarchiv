import { Film } from '../types';

interface FilmCardProps {
  film: Film;
  onClick: (film: Film) => void;
}

export default function FilmCard({ film, onClick }: FilmCardProps) {
  return (
    <button
      onClick={() => onClick(film)}
      className="group text-left focus:outline-none"
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-gray-200 shadow-sm group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
        {film.poster ? (
          <img
            src={film.poster}
            alt={film.titel}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 p-3">
            <span className="font-serif font-bold text-white text-center text-sm leading-tight">
              {film.titel}
            </span>
          </div>
        )}

        {film.bewertung > 0 && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-[#c4f542] text-xs font-bold backdrop-blur">
            {film.bewertung}/10
          </span>
        )}
      </div>

      <h3 className="mt-2 text-sm font-medium text-gray-900 truncate">
        {film.titel}
      </h3>
      <p className="text-xs text-gray-500">
        {film.jahr ? `${film.jahr} · ` : ''}
        {film.genre}
      </p>
    </button>
  );
}
