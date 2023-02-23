import db from ".";

const readableLength = (s: number) => {
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s - hours * 3600) / 60);
  const seconds = Math.floor(s - hours * 3600 - minutes * 60);

  if (hours === 0) {
    return [
      `${minutes < 10 ? "0" : ""}${minutes}`,
      `${seconds < 10 ? "0" : ""}${seconds}`,
    ].join(":");
  }

  return [
    `${hours < 10 ? "0" : ""}${hours}`,
    `${minutes < 10 ? "0" : ""}${minutes}`,
    `${seconds < 10 ? "0" : ""}${seconds}`,
  ].join(":");
};

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
  readableLength: string;
  mtime: string;
  path: string;
  samplerate: number;
  title: string;
  track: number;
  tracktotal: number;
  year: number;
};

export type TrackInList = {
  album: string;
  album_id: number;
  albumartist: string;
  artist: string;
  genre: string;
  id: number;
  length: number;
  readableLength: string;
  title: string;
  track: number;
  tracktotal: number;
  year: number;
};

/** A list of tracks. Note that each track in the list has a reduced subset of
 * fields compared to the `Track` type. */
export type Tracks = TrackInList[];

export const trackById = (id: number): Track =>
  db
    .prepare(
      `
    SELECT
      i.*,
      a.artpath
    FROM items i
    LEFT JOIN albums a
    ON i.album_id = a.id
    WHERE i.id = ?
    `
    )
    .get([id]);

/**
 * Return a giant list of all tracks.
 */
export const tracks = (): Tracks =>
  db
    .prepare(
      `
    SELECT
      album,
      album_id,
      albumartist,
      artist,
      genre,
      id,
      length,
      title,
      track,
      tracktotal,
      year
    FROM items
    ORDER BY album, track, title ASC
  `
    )
    .all()
    .map((_) => ({
      ..._,
      readableLength: readableLength(_.length),
    }));

//     SELECT
//     album,
//     album_id,
//     albumartist,
//     artist,
//     bitrate,
//     channels,
//     disc,
//     disctotal,
//     encoder,
//     format,
//     genre,
//     id,
//     label,
//     length,
//     mtime,
//     path,
//     samplerate,
//     title,
//     track,
//     tracktotal,
//     year
//   FROM items
//   ORDER BY album, track, title ASC
// `
