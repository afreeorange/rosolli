import numeral from "numeral";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { useStore } from "../State";

import styles from "./Common.module.scss";

const Component = () => {
  const {
    current: { albums },
  } = useStore();

  return (
    <div className={`panel ${styles.genres}`}>
      <h1>
        Albums <span>{numeral(albums.length).format("0,0")}</span>
      </h1>

      <ul>
        <li>All Albums</li>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={albums.length}
              itemSize={70}
              overscanCount={10}
              style={{
                paddingBottom: "5em",
              }}
            >
              {({ index, style }: { index: number; style: any }) => (
                <li key={`album-${albums[index].name}`} style={style}>
                  {albums[index].name}
                  <small>
                    <span>{albums[index].counts.tracks} tracks</span>
                    <span>{albums[index].genre}</span>
                  </small>
                  <small>
                    <span>{albums[index].counts.readableTotalLength}</span>
                    <span>{albums[index].year}</span>
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

export default Component;
