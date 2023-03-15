import { FixedSizeList as List } from "react-window";
import numeral from "numeral";
import AutoSizer from "react-virtualized-auto-sizer";

import { useStore } from "../../State";
import { reactTableSettings } from "./constants";

import styles from "./index.module.scss";

const Component = () => {
  const {
    current: { artists },
  } = useStore();

  return (
    <div className={styles.panel}>
      <ul>
        <li
          style={{
            height: reactTableSettings.cellHeight,
            lineHeight: 1.5,
          }}
        >
          <span>All Artists</span>{" "}
          <span>{numeral(artists.length).format("0,0")}</span>
        </li>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={artists.length}
              width={width}
              itemSize={reactTableSettings.cellHeight}
              overscanCount={reactTableSettings.overScanCount}
              style={{
                paddingBottom: reactTableSettings.bottomPadding,
                lineHeight: 1.5,
              }}
            >
              {({ index, style }: { index: number; style: any }) => (
                <li
                  onClick={() => console.log(artists[index])}
                  key={`artist-${artists[index]}`}
                  style={style}
                >
                  {artists[index].name}
                  {/* <small>
                    <span>
                      {numeral(artists[index].counts.genres).format("0,0")}{" "}
                      genre
                      {artists[index].counts.genres > 1 && "s"}
                    </span>
                    <span>
                      {numeral(artists[index].counts.albums).format("0,0")}{" "}
                      album
                      {artists[index].counts.albums > 1 && "s"}
                    </span>
                    <span>
                      {numeral(artists[index].counts.tracks).format("0,0")}{" "}
                      track
                      {artists[index].counts.tracks > 1 && "s"}
                    </span>
                  </small> */}
                </li>
              )}
            </List>
          )}
        </AutoSizer>
      </ul>
    </div>
  );
};

export default Component;
