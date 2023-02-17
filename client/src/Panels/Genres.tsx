import numeral from "numeral";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { useStore } from "../State";
import styles from "./Genres.module.scss";

const Component = () => {
  const { genres } = useStore();

  return (
    <div className={`${styles.genres} panel`}>
      <h1>
        Genres <span>{numeral(genres.length).format("0,0")}</span>
      </h1>

      <ul>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={genres.length}
              itemSize={35}
              overscanCount={10}
            >
              {({ index, style }: { index: number; style: any }) => (
                <li
                  onClick={() => console.log(genres[index])}
                  key={`genre-${genres[index]}`}
                  style={style}
                >
                  {genres[index]}
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
