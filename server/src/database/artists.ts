import db from ".";

export type Artist = {
  name: string;
  counts: {
    genres: number;
    albums: number;
    tracks: number;
  };
};
export type Artists = Artist[];

const sql = `
SELECT
  artist as name,
  count(distinct(genre)) genres,
  count(distinct(album)) as albums,
  count(distinct(title)) as tracks
FROM items
GROUP BY artist
ORDER BY artist ASC;
`;

export const transformer = ({
  name,
  genres,
  albums,
  tracks,
}: {
  name: any;
  genres: any;
  albums: any;
  tracks: any;
}): Artist => ({
  name: name,
  counts: {
    genres,
    albums,
    tracks,
  },
});

export const artists = (): Artists => db.prepare(sql).all().map(transformer);
