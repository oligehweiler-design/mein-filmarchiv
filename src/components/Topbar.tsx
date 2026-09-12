import { Search, Upload, Download } from 'lucide-react';
import { useRef } from 'react';
import { Film } from '../types';

interface TopbarProps {
  search: string;
  onSearch: (v: string) => void;
  ratingFilter: string;
  onRatingFilter: (v: string) => void;
  onImportPoster: () => void;
  films: Film[];
  onImportArchive: (films: Film[]) => void;
}

export default function Topbar({
  search,
  onSearch,
  ratingFilter,
  onRatingFilter,
  onImportPoster,
  films,
  onImportArchive,
}: TopbarProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(films, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'filmarchiv.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string) as Film[];
        if (Array.isArray(data)) onImportArchive(data);
      } catch {
        alert('Datei konnte nicht gelesen werden.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="sticky top-0 z-30 bg-[#f7f7f5]/90 backdrop-blur border-b border-gray-200">
      <div className="flex items-center gap-3 px-8 py-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Filme durchsuchen…"
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c4f542]"
          />
        </div>

        <select
          value={ratingFilter}
          onChange={(e) => onRatingFilter(e.target.value)}
          className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c4f542] cursor-pointer"
        >
          <option value="alle">Alle Bewertungen</option>
          <option value="8">8+ Punkte</option>
          <option value="6">6+ Punkte</option>
          <option value="unbewertet">Unbewertet</option>
        </select>

        <div className="flex-1" />

        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export
        </button>

        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Upload className="w-4 h-4" />
          Import
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={handleImportFile}
        />

        <button
          onClick={onImportPoster}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c4f542] text-gray-900 text-sm font-semibold hover:brightness-95 transition-all"
        >
          <Upload className="w-4 h-4" />
          Poster importieren
        </button>
      </div>
    </header>
  );
}
