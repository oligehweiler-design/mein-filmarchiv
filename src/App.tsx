import { useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import FilmCard from './components/FilmCard';
import GenreCard from './components/GenreCard';
import FilmDetailModal from './components/FilmDetailModal';
import FilmEditModal from './components/FilmEditModal';
import PosterImportModal from './components/PosterImportModal';
import { genres } from './data/films';
import { useLocalArchive } from './hooks/useLocalArchive';
import { Film } from './types';

type ViewMode = 'alle' | 'einzelfilme' | 'filmreihen' | 'genres';
type SortMode = 'titel' | 'jahr' | 'bewertung';

export default function App() {
  const { films, setFilms } = useLocalArchive();
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState('alle');
  const [viewMode, setViewMode] = useState<ViewMode>('alle');
  const [sortMode, setSortMode] = useState<SortMode>('titel');
  const [detailFilm, setDetailFilm] = useState<Film | null>(null);
  const [editFilm, setEditFilm] = useState<Film | null>(null);
  const [showImport, setShowImport] = useState(false);

  const genreCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    genres.forEach((g) => (counts[g] = 0));
    films.forEach((f) => {
      if (counts[f.genre] !== undefined) counts[f.genre]++;
    });
    return counts;
  }, [films]);

  const filtered = useMemo(() => {
    let result = [...films];

    if (activeGenre) result = result.filter((f) => f.genre === activeGenre);

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (f) =>
          f.titel.toLowerCase().includes(q) ||
          f.genre.toLowerCase().includes(q) ||
          f.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (ratingFilter === 'unbewertet') result = result.filter((f) => f.bewertung === 0);
    else if (ratingFilter !== 'alle') {
      const min = Number(ratingFilter);
      result = result.filter((f) => f.bewertung >= min);
    }

    if (viewMode === 'einzelfilme') result = result.filter((f) => f.art === 'Einzelfilm');
    if (viewMode === 'filmreihen') result = result.filter((f) => f.art === 'Filmreihe');

    result.sort((a, b) => {
      if (sortMode === 'titel') return a.titel.localeCompare(b.titel, 'de');
      if (sortMode === 'jahr') return (b.jahr ?? 0) - (a.jahr ?? 0);
      return b.bewertung - a.bewertung;
    });

    return result;
  }, [films, activeGenre, search, ratingFilter, viewMode, sortMode]);

  const einzelfilme = filtered.filter((f) => f.art === 'Einzelfilm');
  const filmreihen = filtered.filter((f) => f.art === 'Filmreihe');

  const handleSave = (updated: Film) => {
    setFilms((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
    setEditFilm(null);
    setDetailFilm(null);
  };

  const handleDelete = (id: string) => {
    setFilms((prev) => prev.filter((f) => f.id !== id));
    setEditFilm(null);
    setDetailFilm(null);
  };

  const handleImport = (newFilms: Film[]) => {
    setFilms((prev) => [...prev, ...newFilms]);
    if (newFilms.length > 0) {
      setActiveGenre(newFilms[0].genre);
      setViewMode('alle');
    }
  };

  const handleImportArchive = (imported: Film[]) => {
    setFilms(imported);
    setActiveGenre(null);
    setViewMode('alle');
  };

  const title = activeGenre ?? 'Alle Filme';

  return (
    <div className="flex min-h-screen bg-[#f7f7f5]">
      <Sidebar
        activeGenre={activeGenre}
        onSelectGenre={(g) => {
          setActiveGenre(g);
          setViewMode('alle');
        }}
        totalCount={films.length}
        genreCounts={genreCounts}
      />

      <div className="flex-1 min-w-0">
        <Topbar
          search={search}
          onSearch={setSearch}
          ratingFilter={ratingFilter}
          onRatingFilter={setRatingFilter}
          onImportPoster={() => setShowImport(true)}
          films={films}
          onImportArchive={handleImportArchive}
        />

        <main className="px-8 py-8">
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
            Deine Bibliothek
          </p>
          <div className="flex items-end justify-between mb-2">
            <h1 className="text-5xl font-serif font-bold text-gray-900">{title}</h1>
          </div>
          <p className="text-sm text-gray-500 mb-6">{filtered.length} Filme in dieser Ansicht</p>

          {/* Ansicht-Umschalter */}
          <div className="flex items-center justify-between mb-8">
            <div className="inline-flex rounded-lg bg-white border border-gray-200 p-1">
              {([
                ['alle', 'Alle'],
                ['einzelfilme', 'Einzelfilme'],
                ['filmreihen', 'Filmreihen'],
                ['genres', 'Genres'],
              ] as [ViewMode, string][]).map(([mode, label]) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    viewMode === mode ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as SortMode)}
              className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c4f542] cursor-pointer"
            >
              <option value="titel">Titel A–Z</option>
              <option value="jahr">Jahr (neu → alt)</option>
              <option value="bewertung">Bewertung (hoch → niedrig)</option>
            </select>
          </div>

          {/* Genres-Ansicht */}
          {viewMode === 'genres' ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-serif font-bold text-gray-900">Genres</h2>
                <span className="text-sm text-gray-500">{genres.length} Genres</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {genres.map((g) => (
                  <GenreCard
                    key={g}
                    name={g}
                    count={genreCounts[g] ?? 0}
                    films={films.filter((f) => f.genre === g)}
                    onClick={() => {
                      setActiveGenre(g);
                      setViewMode('alle');
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Einzelfilme */}
              {(viewMode === 'alle' || viewMode === 'einzelfilme') && einzelfilme.length > 0 && (
                <section className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-serif font-bold text-gray-900">Einzelfilme</h2>
                    <span className="text-sm text-gray-500">{einzelfilme.length} Titel</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-8">
                    {einzelfilme.map((f) => (
                      <FilmCard key={f.id} film={f} onClick={setDetailFilm} />
                    ))}
                  </div>
                </section>
              )}

              {/* Filmreihen */}
              {(viewMode === 'alle' || viewMode === 'filmreihen') && filmreihen.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-serif font-bold text-gray-900">Mehrteiler &amp; Filmreihen</h2>
                    <span className="text-sm text-gray-500">
                      {filmreihen.length} Reihen · {filmreihen.reduce((s, f) => s + (f.teile ?? 0), 0)} Teile
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-8">
                    {filmreihen.map((f) => (
                      <div key={f.id} className="relative">
                        <FilmCard film={f} onClick={setDetailFilm} />
                        {f.teile && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#c4f542] text-gray-900 text-xs font-bold">
                            {f.teile} Teile
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {filtered.length === 0 && (
                <div className="text-center py-24">
                  <p className="text-gray-400 text-lg">Keine Filme gefunden.</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {detailFilm && (
        <FilmDetailModal
          film={detailFilm}
          onClose={() => setDetailFilm(null)}
          onEdit={(f) => {
            setEditFilm(f);
            setDetailFilm(null);
          }}
          onDelete={handleDelete}
        />
      )}

      {editFilm && (
        <FilmEditModal
          film={editFilm}
          onClose={() => setEditFilm(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}

      {showImport && (
        <PosterImportModal
          onClose={() => setShowImport(false)}
          onImport={handleImport}
        />
      )}
    </div>
  );
}
