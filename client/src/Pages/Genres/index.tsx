import { useState } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { TbDna2 } from "react-icons/tb";

import { trpc, useStore } from "../../State";
import { reactTableSettings } from "../Tracks";

import styles from "./index.module.scss";
import numeral from "numeral";

const Albums = () => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const {
    current: { genres },
    searchTerm,
    set,
    showingSearchResults,
  } = useStore();

  // trpc.genres.useQuery(selectedGenre, {
  //   enabled: Boolean(selectedGenre),
  //   onSuccess: (data) => (data ? set.current.album(data) : null),
  // });

  // We're searching and there weren't any matches for our search
  if (showingSearchResults && genres.length === 0) {
    return (
      <div className={styles.all}>
        <div className="waiting-text">
          Couldn&#8217;t find any genres containing &#8220;{searchTerm}
          &#8221;
        </div>
      </div>
    );
  }

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
              itemCount={genres.length}
              itemSize={parseInt(styles.cellHeight)}
              overscanCount={reactTableSettings.overScanCount}
              style={{
                lineHeight: 1.5,
              }}
            >
              {({ index, style }: { index: number; style: any }) => {
                /**
                 * TODO: Do we need `null` albums?
                 */
                let genre = genres[index];

                if (genre) {
                  let {
                    counts: { albums, artists, tracks },
                    name,
                  } = genre;

                  return (
                    <li
                      onClick={() => setSelectedGenre(name)}
                      key={`genre-${name}`}
                      style={style}
                      className={
                        name === selectedGenre ? styles.active : undefined
                      }
                    >
                      <strong>{name}</strong>
                      <span>
                        <span>
                          {numeral(artists).format("0,0")} artist
                          {artists > 1 && "s"}
                        </span>
                        <span>
                          {numeral(albums).format("0,0")} album
                          {albums > 1 && "s"}
                        </span>
                        <span>
                          {numeral(tracks).format("0,0")} track
                          {tracks > 1 && "s"}
                        </span>
                      </span>
                    </li>
                  );
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
  </div>
);

export default Component;
