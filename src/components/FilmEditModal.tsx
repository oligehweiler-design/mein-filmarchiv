import { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Film } from '../types';
import { genres } from '../data/films';
import RatingStrip from './RatingStrip';

interface FilmEditModalProps {
  film: Film;
  onClose: () => void;
  onSave: (film: Film) => void;
  onDelete: (id: string) => void;
}

export default function FilmEditModal({
  film,
  onClose,
  onSave,
  onDelete,
}: FilmEditModalProps) {
  const [draft, setDraft] = useState<Film>(film);

  const update = <K extends keyof Film>(key: K, value: Film[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-serif font-bold text-gray-900">
            Film bearbeiten
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">
              Meine Bewertung
            </p>
            <div className="flex justify-center overflow-visible py-4">
              <RatingStrip
                value={draft.bewertung}
                onChange={(v) => update('bewertung', v)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titel
            </label>
            <input
              value={draft.titel}
              onChange={(e) => update('titel', e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c4f542]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Genre
              </label>
              <select
                value={draft.genre}
                onChange={(e) => update('genre', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c4f542]"
              >
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jahr
              </label>
              <input
                type="number"
                value={draft.jahr ?? ''}
                onChange={(e) =>
                  update('jahr', e.target.value ? Number(e.target.value) : undefined)
                }
                className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c4f542]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Art
              </label>
              <select
                value={draft.art}
                onChange={(e) =>
                  update('art', e.target.value as Film['art'])
                }
                className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c4f542]"
              >
                <option value="Einzelfilm">Einzelfilm</option>
                <option value="Filmreihe">Filmreihe</option>
              </select>
            </div>
            {draft.art === 'Filmreihe' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Anzahl Teile
                </label>
                <input
                  type="number"
                  value={draft.teile ?? ''}
                  onChange={(e) =>
                    update('teile', e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c4f542]"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Beschreibung
            </label>
            <textarea
              value={draft.beschreibung ?? ''}
              onChange={(e) => update('beschreibung', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c4f542] resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (kommagetrennt)
            </label>
            <input
              value={draft.tags.join(', ')}
              onChange={(e) =>
                update(
                  'tags',
                  e.target.value
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean)
                )
              }
              className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c4f542]"
            />
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <button
            onClick={() => onDelete(film.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Löschen
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Abbrechen
            </button>
            <button
              onClick={() => onSave(draft)}
              className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Speichern
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
