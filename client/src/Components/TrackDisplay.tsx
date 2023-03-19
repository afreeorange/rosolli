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
      {track.title}
    </h2>
    <h3>{track.artist}</h3>
    <h4>
      {track.album} {track.year !== 0 && <span>({track.year})</span>}
    </h4>
  </div>
);

export default Component;
