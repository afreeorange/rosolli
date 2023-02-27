import { FixedSizeList as List } from "react-window";
import numeral from "numeral";
import AutoSizer from "react-virtualized-auto-sizer";

import { useStore } from "../State";

import styles from "./Genres.module.scss";

const Component = () => {
  const { artists } = useStore();

  return (
    <div className={`panel ${styles.genres}`}>
      <h1>Artists</h1>

      <ul>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={artists.length}
              itemSize={55}
              overscanCount={10}
              style={{
                paddingBottom: "5em",
              }}
            >
              {({ index, style }: { index: number; style: any }) => (
                <li
                  onClick={() => console.log(artists[index])}
                  key={`artist-${artists[index]}`}
                  style={style}
                >
                  {artists[index].name}
                  <small>
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
