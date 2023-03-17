import db, { Track } from ".";
import { tracksByAlbumId } from "./tracks";
import { readableLength } from "./helpers";

export type Album = {
  name: string;
  artist: string;
  id: number;
  year: number | null;
  genre: string | null;
  label: string | null;
  counts: {
    tracks: number;
    totalLength: number;
    readableTotalLength: string;
  };
  tracks?: Track[];
};
export type Albums = Album[];

/**
 * NOTE: Beets is iffy when it comes to album IDs. You can have two albums the
 * same name but different IDs. There's a whole `albums` table! But we won't
 * use it (at least not yet).
 *
 * Album art is going to be a bit of a mess...
 */
const sql = {
  all: `
SELECT
  DISTINCT album as name,
  albumartist as artist,
  album_id as id,
  year,
  genre,
  label,
  SUM(length) as totalLength,
  COUNT(*) as tracks
FROM items
GROUP BY name
ORDER BY name;
  `,

  one: `
SELECT
  DISTINCT album as name,
  albumartist as artist,
  album_id as id,
  year,
  genre,
  label,
  SUM(length) as totalLength,
  COUNT(*) as tracks
FROM items
WHERE album_id = ?
  `,
};

export const albumsTransformer = ({
  name,
  artist,
  id,
  year,
  genre,
  label,
  totalLength,
  tracks,
}: {
  name: string;
  artist: string;
  id: number;
  year: number;
  genre: string;
  label: string;
  totalLength: number;
  tracks: number;
}): Album => ({
  name: name || "NO_ALBUM",
  artist: artist || "NO_ARTIST",
  id,
  year,
  genre,
  label,
  counts: {
    tracks,
    totalLength,
    readableTotalLength: readableLength(totalLength),
  },
});

export const albums = (): Albums =>
  db.prepare(sql.all).all().map(albumsTransformer);

export const album = async (id: number): Promise<Album> => ({
  ...albumsTransformer(db.prepare(sql.one).get([id])),
  tracks: await tracksByAlbumId(id),
});
