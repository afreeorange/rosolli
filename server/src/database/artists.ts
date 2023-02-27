import db from ".";

export type Artist = {
  name: string;
  counts: {
    genres: number;
    albums: number;
    tracks: number;
  };
};
export type Artists = Artist[];

export const artists = (): Artists =>
  db
    .prepare(
      `
    SELECT
      artist as name,
      count(distinct(genre)) genres,
      count(distinct(album)) as albums,
      count(distinct(title)) as tracks
    FROM items
    GROUP BY artist
    ORDER BY artist ASC
  `
    )
    .all()
    .map(({ name, genres, albums, tracks }) => ({
      name: name,
      counts: {
        genres,
        albums,
        tracks,
      },
    }));
