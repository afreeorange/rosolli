import numeral from "numeral";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { useStore } from "../State";
import styles from "./Artists.module.scss";

const Component = () => {
  const { artists } = useStore();

  return (
    <div className={`${styles.artists} panel`}>
      <h1>
        Artists <span>{numeral(artists.length).format("0,0")}</span>
      </h1>

      <ul>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={artists.length}
              itemSize={35}
              overscanCount={10}
            >
              {({ index, style }: { index: number; style: any }) => (
                <li key={`artist-${artists[index]}`} style={style}>
                  {artists[index]}
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
