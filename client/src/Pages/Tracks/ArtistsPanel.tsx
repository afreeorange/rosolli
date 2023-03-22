import { FixedSizeList as List } from "react-window";
import numeral from "numeral";
import AutoSizer from "react-virtualized-auto-sizer";

import { useStore } from "../../State";
import { reactTableSettings } from ".";

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
              width={width}
              itemCount={artists.length}
              itemSize={reactTableSettings.cellHeight}
              overscanCount={reactTableSettings.overScanCount}
            >
              {/* TODO: Type `style` */}
              {({ index, style }: { index: number; style: any }) => (
                <li
                  onClick={() => console.log(artists[index])}
                  key={`artist-${artists[index]}`}
                  style={{ ...style, display: "flex", alignItems: "center" }}
                >
                  {artists[index].name}
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
