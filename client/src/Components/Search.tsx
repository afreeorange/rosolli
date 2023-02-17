import numeral from "numeral";
import React from "react";

import { useStore } from "../State";
import styles from "./Search.module.scss";

const Component = () => {
  const { statistics } = useStore();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) =>
    console.log(e);

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="search"
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => handleSearch(e)}
      />
    </div>
  );
};

export default Component;
