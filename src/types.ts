export interface Film {
  id: string;
  titel: string;
  genre: string;
  jahr?: number;
  art: 'Einzelfilm' | 'Filmreihe';
  teile?: number;
  bewertung: number;
  beschreibung?: string;
  tags: string[];
  poster?: string;
}
