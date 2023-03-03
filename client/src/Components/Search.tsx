import numeral from "numeral";
import React, { useState } from "react";

import { useStore } from "../State";
import { trpc } from "../State";

import styles from "./Search.module.scss";

export default () => {
  const { searchTerm, set } = useStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    set.searchTerm((e.target as HTMLInputElement).value);

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="search"
        value={searchTerm || ""}
        onChange={(e) => handleSearch(e)}
      />
    </div>
  );
};
