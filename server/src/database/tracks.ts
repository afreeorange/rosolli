import db from ".";
import { parseFile, selectCover } from "music-metadata";
import { createAvatar } from "@dicebear/core";
import { placeholderAlbumCover } from "../helpers";

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

export const trackById = async (id: number): Promise<Track> => {
  const track = db
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
    readableLength: readableLength(track.length),
    path: track.path.toString(),
  };
};

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
