import { FixedSizeList as List } from "react-window";
import numeral from "numeral";
import AutoSizer from "react-virtualized-auto-sizer";

import { useStore } from "../../State";
import { reactTableSettings } from ".";

import styles from "./index.module.scss";

const Component = () => {
  const {
    current: { genres },
  } = useStore();

  return (
    <div className={styles.panel}>
      <ul>
        {/* <li
          style={{
            height: reactTableSettings.cellHeight,
          }}
        >
          <span>All Genres</span>{" "}
          <span>{numeral(genres.length).format("0,0")}</span>
        </li> */}
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={genres.length}
              itemSize={reactTableSettings.cellHeight}
              overscanCount={reactTableSettings.overScanCount}
            >
              {({ index, style }: { index: number; style: any }) => (
                <li
                  onClick={() => console.log(genres[index])}
                  key={`genre-${genres[index]}`}
                  style={{ ...style, display: "flex", alignItems: "center" }}
                >
                  {genres[index].name}
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
