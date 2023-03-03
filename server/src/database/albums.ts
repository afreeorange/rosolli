import db from ".";
import { readableLength } from "./helpers";

export type Album = {
  name: string;
  year: number | null;
  genre: string | null;
  label: string | null;
  counts: {
    tracks: number;
    totalLength: number;
    readableTotalLength: string;
  };
};
export type Albums = Album[];

/**
 * NOTE: Beets is iffy when it comes to album IDs. You can have two albums the
 * same name but different IDs. There's a whole `albums` table! But we won't
 * use it (at least not yet).
 *
 * Album art is going to be a bit of a mess...
 */
const sql = `
SELECT
  DISTINCT(album) as name,
  year,
  genre,
  label,
  SUM(length) as totalLength,
  COUNT(*) as tracks
FROM items
GROUP BY name
ORDER BY name;
`;

export const transformer = ({
  name,
  year,
  genre,
  label,
  totalLength,
  tracks,
}: {
  name: string;
  year: number;
  genre: string;
  label: string;
  totalLength: number;
  tracks: number;
}): Album => ({
  name: name || "NO_ALBUM",
  year,
  genre,
  label,
  counts: {
    tracks,
    totalLength,
    readableTotalLength: readableLength(totalLength),
  },
});

export const albums = (): Albums => db.prepare(sql).all().map(transformer);
