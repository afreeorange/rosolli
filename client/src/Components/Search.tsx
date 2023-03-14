import React, { useEffect, useState, useMemo } from "react";
import { debounce } from "lodash";

import { useStore } from "../State";

import styles from "./Search.module.scss";

export default () => {
  const { searchTerm, set } = useStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    set.searchTerm(e.target.value);

  // TODO: What the fuck?
  // const debouncedHandleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
  //   debounce(handleSearch, 500);

  return (
    <div className={styles.component}>
      <form>
        <input
          type="text"
          placeholder="search"
          id="search"
          value={searchTerm || ""}
          onChange={handleSearch}
        />
      </form>
    </div>
  );
};
