import { FixedSizeList as List } from "react-window";
import numeral from "numeral";
import AutoSizer from "react-virtualized-auto-sizer";
import { BiAlbum } from "react-icons/bi";

import { useStore } from "../../State";
import { reactTableSettings } from "../Tracks";

import styles from "./index.module.scss";

const Albums = () => {
  const {
    current: { albums },
  } = useStore();

  return (
    <div className={styles.component}>
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
                let {
                  genre,
                  label,
                  year,
                  name,
                  artist,
                  counts: { tracks, readableTotalLength: length },
                } = albums[index];

                return (
                  <li
                    onClick={() => console.log(name)}
                    key={`album-${name}`}
                    style={style}
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
  <>
    <Albums />
  </>
);

export default Component;
