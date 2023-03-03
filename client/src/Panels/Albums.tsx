import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { useStore } from "../State";

import styles from "./Genres.module.scss";

const Component = () => {
  const {
    current: { albums },
  } = useStore();

  return (
    <div className={`panel ${styles.genres}`}>
      <h1>Albums</h1>

      <ul>
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
                    <span>{albums[index].counts.readableTotalLength}</span>
                  </small>
                  <small>
                    <span>{albums[index].genre}</span>
                    <span>
                      {albums[index].label} ({albums[index].year})
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

export default Component;
