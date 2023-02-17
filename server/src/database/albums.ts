import db from ".";

export type Album = {
  id: string;
  album: string;
};
export type Albums = Album[];

export const albums = (): Albums =>
  db
    .prepare(
      `
    SELECT
      id,
      album
    FROM albums
    ORDER BY album ASC
  `
    )
    .all();
