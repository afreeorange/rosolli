import numeral from "numeral";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { useStore } from "../../State";
import { reactTableSettings } from ".";

import styles from "./index.module.scss";

const Component = () => {
  const {
    current: { albums },
  } = useStore();

  return (
    <div className={styles.panel}>
      <ul>
        <li
          style={{
            lineHeight: 1.5,
          }}
        >
          <span>All Albums</span>{" "}
          <span>{numeral(albums.length).format("0,0")}</span>
        </li>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={albums.length}
              itemSize={reactTableSettings.cellHeight}
              overscanCount={reactTableSettings.overScanCount}
              style={{
                paddingBottom: reactTableSettings.cellHeight * 2,
                lineHeight: 1.5,
              }}
            >
              {({ index, style }: { index: number; style: any }) => (
                <li key={`album-${albums[index].name}`} style={style}>
                  {albums[index].name}
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
