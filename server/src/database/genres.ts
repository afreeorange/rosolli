import db from ".";

export type Genre = string;
export type Genres = Genre[];

export const genres = (): Genres =>
  db
    .prepare(
      `
    SELECT
      DISTINCT(genre)
    FROM items
    ORDER BY genre
  `
    )
    .all()
    .map((_: any) => (_.genre === "" ? "NO_GENRE" : _.genre));
