import { useState } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { BiAlbum } from "react-icons/bi";

import { trpc, useStore } from "../../State";
import { reactTableSettings } from "../Tracks";
import Album from "./Album";

import styles from "./index.module.scss";

const Albums = () => {
  const [selectedId, setSelectedId] = useState<number | null>(1259);
  const {
    current: { albums },
    set,
  } = useStore();

  trpc.album.useQuery(selectedId, {
    enabled: Boolean(selectedId),
    onSuccess: (data) => (data ? set.current.album(data) : null),
  });

  const filteredAlbums = albums.filter((_) => _.name !== "NO_ALBUM");

  return (
    <div className={styles.all}>
      <ul>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              /**
               * NOTE: We reduce this by one since we're filtering out
               * NO_ALBUM. When we destructure {index, style} in the child
               * component loop, we don't want to overflow the index.
               */
              itemCount={filteredAlbums.length}
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
                let album = filteredAlbums[index];

                if (album) {
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
                        <strong>
                          {name} - {id}
                        </strong>
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
                } else {
                  console.log(">>>", index, album);
                }

                return null;
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
