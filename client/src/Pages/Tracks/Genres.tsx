import { FixedSizeList as List } from "react-window";
import numeral from "numeral";
import AutoSizer from "react-virtualized-auto-sizer";

import { useStore } from "../../State";
import { reactTableSettings } from "./constants";

import styles from "./index.module.scss";

const Component = () => {
  const {
    current: { genres },
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
          <span>All Genres</span>{" "}
          <span>{numeral(genres.length).format("0,0")}</span>
        </li>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={genres.length}
              itemSize={reactTableSettings.cellHeight}
              overscanCount={reactTableSettings.overScanCount}
              style={{
                paddingBottom: reactTableSettings.bottomPadding,
                lineHeight: 1.5,
              }}
            >
              {({ index, style }: { index: number; style: any }) => (
                <li
                  onClick={() => console.log(genres[index])}
                  key={`genre-${genres[index]}`}
                  style={style}
                >
                  {genres[index].name}
                  {/* <small>
                    <span>
                      {numeral(genres[index].counts.artists).format("0,0")}{" "}
                      artist
                      {genres[index].counts.artists > 1 && "s"}
                    </span>
                    <span>
                      {numeral(genres[index].counts.albums).format("0,0")} album
                      {genres[index].counts.albums > 1 && "s"}
                    </span>
                    <span>
                      {numeral(genres[index].counts.tracks).format("0,0")} track
                      {genres[index].counts.tracks > 1 && "s"}
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
