import { Film } from '../types';

interface GenreCardProps {
  name: string;
  count: number;
  films: Film[];
  onClick: () => void;
}

export default function GenreCard({ name, count, films, onClick }: GenreCardProps) {
  const previews = films.slice(0, 4);

  return (
    <button
      onClick={onClick}
      className="group text-left rounded-xl overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="grid grid-cols-2 gap-0.5 bg-gray-100 aspect-[4/3]">
        {Array.from({ length: 4 }).map((_, i) => {
          const f = previews[i];
          return (
            <div key={i} className="overflow-hidden bg-gray-200">
              {f?.poster ? (
                <img src={f.poster} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800" />
              )}
            </div>
          );
        })}
      </div>
      <div className="p-4">
        <h3 className="font-serif font-bold text-gray-900">{name}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{count} Filme</p>
      </div>
    </button>
  );
}
