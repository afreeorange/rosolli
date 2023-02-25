import db from ".";

export type Genre = {
  name: string;
  counts: {
    artists: number;
    albums: number;
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
      count(distinct(album)) as albums
    FROM items
    GROUP BY genre
    ORDER BY genre
  `
    )
    .all()
    .map(({ name, artists, albums }) => ({
      name: name || "NO_GENRE",
      counts: {
        artists,
        albums,
      },
    }));
