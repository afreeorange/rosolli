import numeral from "numeral";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { useStore } from "../State";

const Component = () => {
  const { albums } = useStore();

  return (
    <div className="panel">
      <h1>
        Albums <span>{numeral(albums.length).format("0,0")}</span>
      </h1>

      <ul>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={albums.length}
              itemSize={35}
              overscanCount={10}
            >
              {({ index, style }: { index: number; style: any }) => (
                <li key={`album-${albums[index].id}`} style={style}>
                  {albums[index].album}
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
