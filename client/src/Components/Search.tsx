import numeral from "numeral";
import React, { useState } from "react";

import { useStore } from "../State";
import { trpc } from "../State";

import styles from "./Search.module.scss";

const Component = () => {
  const { statistics } = useStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let term = (e.target as HTMLInputElement).value;
    console.log(">>>", term);
    // setTerm(term);

    // if (term.length >= 3) {
    //   console.log(term);
    // }
  };

  // console.log(trpc.search.useQuery("air").data);

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="search"
        value={""}
        onChange={(e) => handleSearch(e)}
      />
    </div>
  );
};

export default Component;
