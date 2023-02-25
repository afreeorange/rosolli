import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { useStore } from "../State";

const Component = () => {
  const { genres } = useStore();

  return (
    <div className="panel">
      <h1>Genres</h1>

      <ul>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={genres.length}
              itemSize={35}
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
