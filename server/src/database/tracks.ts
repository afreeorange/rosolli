import { parseFile, selectCover } from "music-metadata";

import db, { Album } from ".";
import { placeholderAlbumCover } from "../helpers";
import { readableLength } from "./helpers";

/**
 * An individual track with all the available/possible data about a
 * given track.
 */
export type Track = {
  album: string;
  album_id: number;
  albumartist: string;
  artist: string;
  bitrate: number;
  channels: number;
  disc: number;
  disctotal: number;
  encoder: string;
  format: string;
  genre: string;
  id: number;
  label: string;
  length: number;
  mtime: string;
  path: string;
  samplerate: number;
  title: string;
  track: number;
  tracktotal: number;
  year: number;

  // These fields are not part of the Beets schema; we add them.
  cover: string;
  readableLength: string;
};

export type TrackInList = {
  album: string;
  album_id: number;
  albumartist: string;
  artist: string;
  genre: string;
  id: number;
  length: number;
  title: string;
  track: number;
  tracktotal: number;
  year: number;

  // These fields are not part of the Beets schema; we add them.
  readableLength: string;
};

/** A list of tracks. Note that each track in the list has a reduced subset of
 * fields compared to the `Track` type. */
export type Tracks = TrackInList[];

/** ------------------ */

const sql = {
  all: `
SELECT
  album,
  album_id,
  albumartist,
  artist,
  genre,
  id,
  path,
  length,
  title,
  track,
  tracktotal,
  year
FROM items
ORDER BY album, track, title ASC
  `,

  one: `
SELECT
  i.*,
  a.artpath
FROM items i
LEFT JOIN albums a
ON i.album_id = a.id
WHERE i.id = ?
`,

  byGenre: `
SELECT
  i.*,
  a.artpath
FROM items i
LEFT JOIN albums a
ON i.album_id = a.id
WHERE i.genre = ?
`,

  byAlbumId: `
SELECT
  i.*
FROM items i
WHERE album_id = ?
ORDER BY track, title ASC
`,
};

/**
 * TODO: This is sloooooooooooow (no surprises here)
 */
const injectCoverArt = async (track: Track): Promise<Track> => {
  /**
   * Try to read the album art associated with the track
   *
   * TODO: Add a way to return ALL the album art associated with the track...
   */
  const { common } = await parseFile(track.path.toString());
  const cover = selectCover(common.picture);

  return {
    ...track,
    cover: cover
      ? `data:${cover.format};base64,${cover.data.toString("base64")}`
      : await placeholderAlbumCover(track),
  };
};

export const tracksTransformer = (_: Track): Track => ({
  ..._,
  path: _.path ? _.path.toString() : "",
  readableLength: readableLength(_.length),
});

export const trackById = async (id: number): Promise<Track> =>
  await injectCoverArt(tracksTransformer(db.prepare(sql.one).get([id])));

export const tracks = (): Tracks =>
  db.prepare(sql.all).all().map(tracksTransformer);

export const tracksByGenre = (genre: string): Tracks =>
  db.prepare(sql.byGenre).all([genre]).map(tracksTransformer);

export const tracksByAlbumId = async (id: number): Promise<Track[]> =>
  Promise.all(
    db
      .prepare(sql.byAlbumId)
      .all([id])
      .map(async (_) => await tracksTransformer(_))
  );
