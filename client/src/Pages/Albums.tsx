import { FixedSizeList as List } from "react-window";
import numeral from "numeral";
import AutoSizer from "react-virtualized-auto-sizer";
import { BiAlbum } from "react-icons/bi";

import { useStore } from "../State";
import { reactTableSettings } from "./Tracks";

import styles from "./Albums.module.scss";

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
              itemSize={150}
              overscanCount={reactTableSettings.overScanCount}
              style={{
                paddingBottom: reactTableSettings.paddingBottom,
                lineHeight: 1.5,
              }}
            >
              {({ index, style }: { index: number; style: any }) => (
                <li
                  onClick={() => console.log(albums[index])}
                  key={`album-${albums[index]}`}
                  style={style}
                >
                  <span>
                    <BiAlbum />
                  </span>
                  <span>
                    {albums[index].name}
                    <small>
                      <span>
                        {numeral(albums[index].counts.tracks).format("0,0")}{" "}
                        artist
                        {albums[index].counts.tracks > 1 && "s"}
                      </span>
                      <span>{albums[index].counts.readableTotalLength}</span>
                    </small>
                  </span>
                </li>
              )}
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
