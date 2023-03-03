import db from ".";

export type Genre = {
  name: string;
  counts: {
    artists: number;
    albums: number;
    tracks: number;
  };
};
export type Genres = Genre[];

const sql = `
SELECT
  genre as name,
  count(distinct(artist)) artists,
  count(distinct(album)) as albums,
  count(distinct(title)) as tracks
FROM items
GROUP BY genre
ORDER BY genre
`;

export const transformer = ({
  name,
  artists,
  albums,
  tracks,
}: {
  name: string;
  artists: number;
  albums: number;
  tracks: number;
}): Genre => ({
  name: name || "NO_GENRE",
  counts: {
    artists,
    albums,
    tracks,
  },
});

export const genres = (): Genres => db.prepare(sql).all().map(transformer);
