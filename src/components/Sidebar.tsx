import AppLogo from './AppLogo';

interface SidebarProps {
  activeGenre: string | null;
  onSelectGenre: (genre: string | null) => void;
  totalCount: number;
  genreCounts: Record<string, number>;
}

export default function Sidebar({
  activeGenre,
  onSelectGenre,
  totalCount,
  genreCounts,
}: SidebarProps) {
  const genreList = Object.keys(genreCounts);

  return (
    <aside className="w-64 shrink-0 bg-[#111827] text-gray-300 min-h-screen flex flex-col">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
        <AppLogo className="w-9 h-9" />
        <span className="font-serif text-xl font-bold text-white">Filmarchiv</span>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <button
          onClick={() => onSelectGenre(null)}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeGenre === null
              ? 'bg-[#c4f542] text-gray-900'
              : 'hover:bg-white/5 text-gray-300'
          }`}
        >
          <span>Alle Filme</span>
          <span className="text-xs opacity-70">{totalCount}</span>
        </button>

        <p className="px-3 mt-6 mb-2 text-xs font-semibold tracking-widest text-gray-500 uppercase">
          Genres
        </p>

        {genreList.map((g) => (
          <button
            key={g}
            onClick={() => onSelectGenre(g)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
              activeGenre === g
                ? 'bg-[#c4f542] text-gray-900 font-medium'
                : 'hover:bg-white/5 text-gray-300'
            }`}
          >
            <span>{g}</span>
            <span className="text-xs opacity-70">{genreCounts[g] ?? 0}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
