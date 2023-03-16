import { FixedSizeList as List } from "react-window";
import numeral from "numeral";
import AutoSizer from "react-virtualized-auto-sizer";

import { useStore } from "../State";
import { reactTableSettings } from "./Tracks/constants";

import styles from "./Genres.module.scss";

const Genres = () => {
  const {
    current: { genres },
  } = useStore();

  return (
    <div className={styles.component}>
      <h1>Genres</h1>

      <ul>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={genres.length}
              itemSize={90}
              overscanCount={reactTableSettings.overScanCount}
              style={{
                paddingBottom: reactTableSettings.paddingBottom,
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
                  <small>
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
                  </small>
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
    <Genres />
  </>
);

export default Component;
