import { Film } from '../types';

export interface ArchiveFile {
  version: number;
  exportedAt: string;
  films: Film[];
}

export function exportArchive(films: Film[]) {
  const data: ArchiveFile = {
    version: 1,
    exportedAt: new Date().toISOString(),
    films,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `filmarchiv-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function parseArchive(text: string): Film[] {
  const data = JSON.parse(text);
  if (Array.isArray(data)) return data as Film[];
  if (data && Array.isArray(data.films)) return data.films as Film[];
  throw new Error('Ungültiges Archivformat');
}
