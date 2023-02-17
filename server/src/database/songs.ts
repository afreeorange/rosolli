import db from ".";

export type Song = {
  id: string;
  album: string;
  artist: string;
  genre: string;
  length: string;
  title: string;
  year: string;
};
export type Songs = Song[];

export const songs = (): Songs =>
  db
    .prepare(
      `
    SELECT
      id,
      album,
      artist,
      genre,
      length,
      title,
      year
    FROM items
    ORDER BY album, title ASC
  `
    )
    .all();
