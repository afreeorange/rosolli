import numeral from "numeral";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { useStore } from "../State";
import styles from "./Songs.module.scss";

const Component = () => {
  const { songs } = useStore();

  return (
    <div className={`${styles.songs} panel`}>
      <h1>
        Songs <span>{numeral(songs.length).format("0,0")}</span>
      </h1>

      <ul>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={songs.length}
              itemSize={35}
              overscanCount={10}
            >
              {({ index, style }: { index: number; style: any }) => (
                <li key={`song-${songs[index]}`} style={style}>
                  {songs[index].title}
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
