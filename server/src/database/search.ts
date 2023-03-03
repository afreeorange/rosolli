import db, { Album, Artist, Genre, Track } from ".";
import { transformer as transformerGenres } from "./genres";
import { transformer as transformerArtists } from "./artists";
import { transformer as transformerAlbums } from "./albums";
import { transformer as transformerTracks } from "./tracks";

const SEARCH_RESULT_LIMIT = 100;

export type SearchResults = {
  genres: Genre[];
  artists: Artist[];
  albums: Album[];
  songs: Track[];
};

const sql = {
  genres: `
SELECT
  genre as name,
  COUNT(DISTINCT(artist)) artists,
  COUNT(DISTINCT(album)) as albums,
  COUNT(DISTINCT(title)) as tracks
FROM items
WHERE
  genre LIKE ?
GROUP BY genre
ORDER BY genre
LIMIT ${SEARCH_RESULT_LIMIT};
  `,

  artists: `
SELECT
  artist as name,
  COUNT(DISTINCT(genre)) genres,
  COUNT(DISTINCT(album)) as albums,
  COUNT(DISTINCT(title)) as tracks
FROM items
WHERE
  artist LIKE ?
GROUP BY artist
ORDER BY artist ASC
LIMIT ${SEARCH_RESULT_LIMIT};
  `,

  albums: `
SELECT
  DISTINCT(album) as name,
  year,
  genre,
  label,
  SUM(length) as totalLength,
  COUNT(*) as tracks
FROM items
WHERE
  album LIKE ?
GROUP BY name
ORDER BY name ASC
LIMIT ${SEARCH_RESULT_LIMIT};
`,

  tracks: `
SELECT
  album,
  album_id,
  albumartist,
  artist,
  genre,
  id,
  length,
  title,
  track,
  tracktotal,
  year
FROM items
WHERE
  title LIKE ?
ORDER BY album, track, title ASC
LIMIT ${SEARCH_RESULT_LIMIT};
`,
};

export const search = (term: string) => {
  if (!term || term.length < 3) {
    throw Error("Search term must be a minimum of three characters.");
  }

  const genres = db
    .prepare(sql.genres)
    .all([`%${term}%`])
    .map(transformerGenres);

  const artists = db
    .prepare(sql.artists)
    .all([`%${term}%`])
    .map(transformerArtists);

  const albums = db
    .prepare(sql.albums)
    .all([`%${term}%`])
    .map(transformerAlbums);

  const tracks = db
    .prepare(sql.tracks)
    .all([`%${term}%`])
    .map(transformerTracks);

  return {
    genres,
    albums,
    artists,
    tracks,
  };
};
