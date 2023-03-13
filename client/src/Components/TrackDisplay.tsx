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

    <h2>
      {track.title} <span>by {track.artist}</span>
    </h2>
    <h3>
      {track.album} {track.year !== 0 && <span>({track.year})</span>}
    </h3>
  </div>
);

export default Component;
