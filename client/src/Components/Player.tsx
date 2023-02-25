import React from "react";

import { useStore } from "../State";
import styles from "./Player.module.scss";

const Component = () => {
  const {
    current: { playingTrack },
  } = useStore();

  if (playingTrack) {
    return (
      <div className={styles.player}>
        {playingTrack.cover && (
          <img src={playingTrack.cover} alt={"TODO: Fill me later"} />
        )}

        <h3>{playingTrack.title}</h3>
        <h4>by {playingTrack.artist}</h4>

        <audio key={playingTrack.id} controls>
          <source src={`http://localhost:3000/api/stream/${playingTrack.id}`} />
        </audio>
      </div>
    );
  }

  return null;
};

export default Component;
