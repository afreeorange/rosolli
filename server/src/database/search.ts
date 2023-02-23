import db, { Track } from ".";

export type SearchResults = {
  genres: string[];
  artists: string[];
  albums: {
    id: string;
    album: string;
  }[];
  songs: Track[];
};

export const search = (term: string) => {
  if (!term || term.length < 3) {
    throw Error("Search term must be a minimum of three characters.");
  }

  const genres = db
    .prepare(
      `
  SELECT
    DISTINCT(genre)
  FROM items
  WHERE
    genre LIKE ?
    ORDER BY genre
  LIMIT 100;
  `
    )
    .all([`%${term}%`])
    .map((_) => _.genre);

  const artists = db
    .prepare(
      `
  SELECT
  DISTINCT(artist)
  FROM items
  WHERE artist LIKE ?
  ORDER BY artist ASC
  `
    )
    .all([`%${term}%`])
    .map((_) => _.artist);

  const albums = db
    .prepare(
      `
  SELECT
    album_id as id,
    album
  FROM items
  WHERE
    album LIKE ?
  ORDER BY year, album
  LIMIT 100;
  `
    )
    .all([`%${term}%`])
    .map((_) => ({
      id: _.id,
      album: _.album,
    }));

  const tracks = db
    .prepare(
      `
  SELECT
    i.*,
    a.artpath
  FROM items i
  LEFT JOIN albums a
  ON i.album_id = a.id
  WHERE i.title LIKE ?
  `
    )
    .all([`%${term}%`])
    .map((_: Track) => ({
      ..._,
      path: _.path.toString(),
    }));

  return {
    genres,
    albums,
    artists,
    tracks,
  };
};
