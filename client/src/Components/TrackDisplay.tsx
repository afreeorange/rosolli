import { Track } from "@rosolli/server";

import styles from "./TrackDisplay.module.scss";

const Component: React.FC<{ track: Track }> = ({ track }) => (
  <div className={styles.component}>
    <div
      className={styles["album-art"]}
      style={{
        backgroundColor: "red",
        backgroundImage: `url('${track.cover}')`,
      }}
    ></div>

    <h1>{track.title}</h1>
    <h2>{track.artist}</h2>
    <h3>
      {track.album} {track.year !== 0 && <span>({track.year})</span>}
    </h3>
  </div>
);

export default Component;
