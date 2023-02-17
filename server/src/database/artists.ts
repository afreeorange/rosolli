import db from ".";

export type Artist = string;
export type Artists = Artist[];

export const artists = (): Artists =>
  db
    .prepare(
      `
    SELECT
      DISTINCT(artist)
    FROM items
    ORDER BY artist ASC
  `
    )
    .all()
    .map((_) => _.artist);
