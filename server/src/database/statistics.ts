import db from ".";

const listeningTimes = (milliSeconds: number) => {
  let years, months, days, hours, minutes, seconds;

  seconds = Math.floor(milliSeconds / 1000);
  minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  days = Math.floor(hours / 24);
  hours = hours % 24;
  months = Math.floor(days / 30);
  days = days % 30;
  years = Math.floor(months / 12);
  months = months % 12;

  return { years, months, days, hours, minutes, seconds };
};

export type Statistics = {
  genres: number;
  albums: number;
  artists: number;
  albumArtists: number;
  songs: number;
  latest: {
    id: string;
    song: string;
    artist: string;
    added: number;
  }[];
  listeningTime: {
    total: number;
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
};

export const statistics = (): Statistics => {
  const genres = db
    .prepare(`SELECT COUNT(DISTINCT(genre)) as c FROM items`)
    .get()["c"];

  const albums = db
    .prepare(`SELECT COUNT(DISTINCT(album)) as c FROM items`)
    .get()["c"];

  const artists = db
    .prepare(`SELECT COUNT(DISTINCT(artist)) as c FROM items`)
    .get()["c"];

  const albumArtists = db
    .prepare(`SELECT COUNT(DISTINCT(albumartist)) as c FROM items`)
    .get()["c"];

  const songs = db.prepare(`SELECT COUNT(*) as c FROM items`).get()["c"];

  const time = db.prepare(`SELECT sum(length) as c FROM items`).get()["c"];

  const latest = db
    .prepare(
      `SELECT
        id,
        title as song,
        artist,
        added
      FROM items
      ORDER BY added DESC
      LIMIT 25`
    )
    .all();

  return {
    genres,
    albums,
    artists,
    albumArtists,
    songs,
    latest,
    listeningTime: {
      total: Math.ceil(time),
      ...listeningTimes(time * 1000),
    },
  };
};
