import React from "react";

import { useStore } from "../State";
import styles from "./Player.module.scss";

const Component = () => {
  const { current } = useStore();

  if (current.track) {
    return (
      <div className={styles.player}>
        <h3>{current.track}</h3>
        <audio controls>
          <source src={`http://localhost:3000/api/stream/${current.track}`} />
        </audio>
      </div>
    );
  }

  return null;
};

export default Component;
