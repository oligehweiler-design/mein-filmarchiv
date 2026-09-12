import { X, Pencil, Trash2 } from 'lucide-react';
import { Film } from '../types';
import RatingStrip from './RatingStrip';
import RatingDisplay from './RatingDisplay';

interface FilmDetailModalProps {
  film: Film;
  onClose: () => void;
  onEdit: (film: Film) => void;
  onDelete: (id: string) => void;
}

export default function FilmDetailModal({
  film,
  onClose,
  onEdit,
  onDelete,
}: FilmDetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-64 shrink-0 bg-gray-100">
            {film.poster ? (
              <img
                src={film.poster}
                alt={film.titel}
                className="w-full h-full object-cover sm:rounded-l-2xl"
              />
            ) : (
              <div className="w-full aspect-[2/3] flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 sm:rounded-l-2xl">
                <span className="font-serif font-bold text-white text-center px-4">
                  {film.titel}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                  {film.titel}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  {film.genre}
                  {film.jahr ? ` · ${film.jahr}` : ''} · {film.art}
                  {film.teile ? ` (${film.teile} Teile)` : ''}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {film.bewertung > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <RatingDisplay value={film.bewertung} />
                <div className="mt-4 flex justify-center overflow-visible py-4">
                  <RatingStrip value={film.bewertung} />
                </div>
              </div>
            )}

            {film.beschreibung && (
              <p className="text-sm text-gray-600 mt-6 leading-relaxed">
                {film.beschreibung}
              </p>
            )}

            {film.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {film.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-gray-100 text-xs text-gray-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => onEdit(film)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                <Pencil className="w-4 h-4" />
                Bearbeiten
              </button>
              <button
                onClick={() => onDelete(film.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Löschen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
