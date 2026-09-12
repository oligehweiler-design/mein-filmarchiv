import { useEffect, useState } from 'react';
import { Film } from '../types';
import { initialFilms } from '../data/films';

const STORAGE_KEY = 'mein-filmarchiv';

export function useLocalArchive() {
  const [films, setFilms] = useState<Film[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as Film[];
    } catch {
      /* ignore */
    }
    return initialFilms;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(films));
    } catch {
      /* ignore */
    }
  }, [films]);

  return { films, setFilms };
}
