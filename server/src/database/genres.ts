import db from ".";

export type Genre = {
  name: string;
  counts: {
    artists: number;
    albums: number;
    tracks: number;
  };
};
export type Genres = Genre[];

export const genres = (): Genres =>
  db
    .prepare(
      `
    SELECT
      genre as name,
      count(distinct(artist)) artists,
      count(distinct(album)) as albums,
      count(distinct(title)) as tracks
    FROM items
    GROUP BY genre
    ORDER BY genre
  `
    )
    .all()
    .map(({ name, artists, albums, tracks }) => ({
      name: name || "NO_GENRE",
      counts: {
        artists,
        albums,
        tracks,
      },
    }));
