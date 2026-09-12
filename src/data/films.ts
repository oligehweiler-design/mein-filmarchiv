import { Film } from '../types';

export const genres: string[] = [
  'Action',
  'Abenteuer',
  'Animation',
  'Dokumentation',
  'Drama',
  'Fantasy',
  'Horror',
  'Komödie',
  'Krimi',
  'Science-Fiction',
  'Thriller',
  'Western',
];

export const initialFilms: Film[] = [
  {
    id: 'f1',
    titel: 'Der Pate',
    genre: 'Drama',
    jahr: 1972,
    art: 'Einzelfilm',
    bewertung: 10,
    beschreibung:
      'Die Geschichte der Corleone-Familie – ein Meisterwerk über Macht, Familie und Verrat.',
    tags: ['Mafia', 'Klassiker'],
  },
  {
    id: 'f2',
    titel: 'Blade Runner 2049',
    genre: 'Science-Fiction',
    jahr: 2017,
    art: 'Einzelfilm',
    bewertung: 9,
    beschreibung:
      'Ein junger Blade Runner entdeckt ein lange verborgenes Geheimnis, das das Gleichgewicht der Gesellschaft bedroht.',
    tags: ['Neo-Noir', 'Zukunft'],
  },
  {
    id: 'f3',
    titel: 'Herr der Ringe',
    genre: 'Fantasy',
    jahr: 2001,
    art: 'Filmreihe',
    teile: 3,
    bewertung: 10,
    beschreibung:
      'Die epische Reise durch Mittelerde – vom Auenland bis zum Schicksalsberg.',
    tags: ['Episch', 'Mittelerde'],
  },
  {
    id: 'f4',
    titel: 'Inception',
    genre: 'Science-Fiction',
    jahr: 2010,
    art: 'Einzelfilm',
    bewertung: 8,
    beschreibung:
      'Ein Dieb, der in Träume eindringt, erhält den Auftrag, einen Gedanken zu implantieren.',
    tags: ['Traum', 'Heist'],
  },
  {
    id: 'f5',
    titel: 'Alien',
    genre: 'Horror',
    jahr: 1979,
    art: 'Filmreihe',
    teile: 4,
    bewertung: 9,
    beschreibung:
      'Die Crew der Nostromo trifft auf ein tödliches außerirdisches Wesen.',
    tags: ['Weltraum', 'Kreatur'],
  },
  {
    id: 'f6',
    titel: 'Pulp Fiction',
    genre: 'Krimi',
    jahr: 1994,
    art: 'Einzelfilm',
    bewertung: 9,
    beschreibung:
      'Verschiedene Geschichten aus der Unterwelt von Los Angeles verweben sich zu einem Ganzen.',
    tags: ['Tarantino', 'Kult'],
  },
  {
    id: 'f7',
    titel: 'Toy Story',
    genre: 'Animation',
    jahr: 1995,
    art: 'Filmreihe',
    teile: 4,
    bewertung: 8,
    beschreibung:
      'Die Abenteuer von Woody und Buzz – Spielzeug, das lebendig wird.',
    tags: ['Pixar', 'Familie'],
  },
  {
    id: 'f8',
    titel: 'Der Soldat James Ryan',
    genre: 'Action',
    jahr: 1998,
    art: 'Einzelfilm',
    bewertung: 8,
    beschreibung:
      'Eine Gruppe Soldaten begibt sich hinter feindliche Linien, um einen vermissten Soldaten zu finden.',
    tags: ['Krieg', 'Spielberg'],
  },
];
