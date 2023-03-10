import React from "react";
import TrackDisplay from "../Components/TrackDisplay";

import { useStore } from "../State";
import styles from "./Player.module.scss";

const Component = () => {
  const {
    current: { playingTrack },
  } = useStore();

  if (playingTrack) {
    return (
      <div className={styles.player}>
        <TrackDisplay track={playingTrack} />

        <audio key={playingTrack.id} controls>
          <source src={`http://localhost:3000/api/stream/${playingTrack.id}`} />
        </audio>
      </div>
    );
  }

  return (
    <div className="waiting-text">
      <p>Nothing's playing.</p>
    </div>
  );
};

export default Component;
