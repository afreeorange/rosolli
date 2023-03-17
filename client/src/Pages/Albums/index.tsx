import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { BiAlbum } from "react-icons/bi";

import { trpc, useStore } from "../../State";
import { reactTableSettings } from "../Tracks";

import styles from "./index.module.scss";
import { useState } from "react";

const Album = () => {
  const {
    current: { album },
  } = useStore();

  if (!album) {
    return (
      <div className={`${styles.one} waiting-text`}>
        Select an album to view more information about it.
      </div>
    );
  }

  return (
    <div className={styles.one}>
      <h1>{album.name}</h1>
      <h2>{album.artist}</h2>
      <table>
        <tbody>
          {album.tracks?.map((_) => (
            <tr key={_.id}>
              <td>{_.title}</td>
              <td>
                <code>{_.readableLength}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Albums = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const {
    current: { albums },
    set,
  } = useStore();

  trpc.album.useQuery(selectedId, {
    enabled: Boolean(selectedId),
    onSuccess: (data) => (data ? set.current.album(data) : null),
  });

  return (
    <div className={styles.all}>
      <ul>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={albums.length}
              itemSize={85}
              overscanCount={reactTableSettings.overScanCount}
              style={{
                lineHeight: 1.5,
              }}
            >
              {({ index, style }: { index: number; style: any }) => {
                /**
                 * TODO: Do we need `null` albums?
                 */
                let album = albums.filter((_) => _.id !== null)[index];
                let {
                  artist,
                  id,
                  name,
                  year,
                  counts: { tracks, readableTotalLength: length },
                } = album;

                return (
                  <li
                    onClick={() => setSelectedId(id)}
                    key={`album-${name}`}
                    style={style}
                    className={id === selectedId ? styles.active : undefined}
                  >
                    <span>
                      <BiAlbum />
                    </span>

                    <span>
                      <strong>{name}</strong>
                      <em data-artist={artist}>
                        {artist || "(Unknown Artist)"}
                      </em>
                      <span>
                        <span>
                          {tracks} {`${tracks > 1 ? "tracks" : "track"}`}
                        </span>
                        <span>{length}</span>
                        <span>{!year || year === 0 ? "" : year}</span>
                      </span>
                    </span>
                  </li>
                );
              }}
            </List>
          )}
        </AutoSizer>
      </ul>
    </div>
  );
};

const Component = () => (
  <div className={styles.wrapper}>
    <Albums />
    <Album />
  </div>
);

export default Component;
