import { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { Film } from '../types';
import { genres } from '../data/films';

interface PosterImportModalProps {
  onClose: () => void;
  onImport: (films: Film[]) => void;
}

export default function PosterImportModal({ onClose, onImport }: PosterImportModalProps) {
  const [genre, setGenre] = useState(genres[0]);
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(e.target.files ?? []));
  };

  const handleImport = async () => {
    if (files.length === 0) return;
    setBusy(true);

    const newFilms: Film[] = [];
    for (const file of files) {
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const titel = file.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ');
      newFilms.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        titel,
        genre,
        art: 'Einzelfilm',
        bewertung: 0,
        tags: [],
        poster: dataUrl,
      });
    }

    onImport(newFilms);
    setBusy(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-serif font-bold text-gray-900">
            Poster importieren
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Genre
        </label>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-[#c4f542]"
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          JPG-Dateien
        </label>
        <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl py-8 cursor-pointer hover:border-[#c4f542] transition-colors">
          <Upload className="w-6 h-6 text-gray-400" />
          <span className="text-sm text-gray-500">
            {files.length > 0
              ? `${files.length} Datei(en) ausgewählt`
              : 'Dateien auswählen'}
          </span>
          <input
            type="file"
            accept="image/jpeg,image/jpg"
            multiple
            className="hidden"
            onChange={handleFiles}
          />
        </label>

        <div className="flex gap-2 mt-6">
          <button
            onClick={handleImport}
            disabled={files.length === 0 || busy}
            className="flex-1 px-4 py-2 rounded-lg bg-[#c4f542] text-gray-900 text-sm font-semibold hover:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {busy ? 'Importiere…' : 'Importieren'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  );
}
