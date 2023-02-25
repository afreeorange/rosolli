import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import styles from "./Genres.module.scss";

import { useStore } from "../State";

const Component = () => {
  const { genres } = useStore();

  return (
    <div className={`panel ${styles.genres}`}>
      <h1>Genres</h1>

      <ul>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={genres.length}
              itemSize={55}
              overscanCount={10}
              style={{
                paddingBottom: "5em",
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
                      {genres[index].counts.albums} album
                      {genres[index].counts.albums > 1 && "s"}
                    </span>
                    <span>
                      {genres[index].counts.artists} artist
                      {genres[index].counts.artists > 1 && "s"}
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
