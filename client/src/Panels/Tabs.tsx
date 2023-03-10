import { RiGitBranchLine, RiGitBranchFill } from "react-icons/ri";
import { AiOutlineHistory } from "react-icons/ai";
import { AiOutlineSetting, AiTwotoneSetting } from "react-icons/ai";
import { IoPlay, IoPlayOutline } from "react-icons/io5";
import { BsCassette, BsCassetteFill } from "react-icons/bs";

import Links from "../Components/Links";
import Search from "../Components/Search";
import ListeningTime from "../Components/ListeningTime";
import History from "../Components/History";
import Player from "./Player";
import Track from "./Track";
import { useStore } from "../State";

import styles from "./Tabs.module.scss";
import { useEffect, useState } from "react";
import Version from "../Components/Version";

const Component = () => {
  const {
    current: { tabNumber },
    set,
    searchTerm,
  } = useStore();

  /**
   * This whole apparatus here to make sure that we switch back to a tab the
   * user might have been on before searching (since we're disturbing their
   * flow by switching to the links tab).
   */
  const [oldTab, setOldTab] = useState(tabNumber);

  useEffect(() => {
    if (searchTerm && searchTerm.length >= 3) {
      set.current.tabNumber(0);
    } else {
      set.current.tabNumber(oldTab);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (tabNumber !== 0) {
      setOldTab(tabNumber);
    }
  }, [tabNumber]);

  return (
    <div className={styles.main}>
      <Search />
      <ul role="tablist">
        <li
          role="tab"
          aria-selected={tabNumber === 0}
          onClick={() => set.current.tabNumber(0)}
        >
          {tabNumber === 0 ? <RiGitBranchFill /> : <RiGitBranchLine />}
        </li>
        <li
          role="tab"
          aria-selected={tabNumber === 1}
          onClick={() => set.current.tabNumber(1)}
        >
          {tabNumber === 1 ? <AiTwotoneSetting /> : <AiOutlineSetting />}
        </li>
        <li
          role="tab"
          aria-selected={tabNumber === 2}
          onClick={() => set.current.tabNumber(2)}
        >
          <AiOutlineHistory />
        </li>
        <li
          role="tab"
          aria-selected={tabNumber === 3}
          onClick={() => set.current.tabNumber(3)}
        >
          {tabNumber === 3 ? <BsCassetteFill /> : <BsCassette />}
        </li>
        <li
          role="tab"
          aria-selected={tabNumber === 4}
          onClick={() => set.current.tabNumber(4)}
        >
          {tabNumber === 4 ? <IoPlay /> : <IoPlayOutline />}
        </li>
      </ul>

      <div role={tabNumber === 0 ? "selected-panel" : "panel"}>
        <Links />
      </div>
      <div role={tabNumber === 1 ? "selected-panel" : "panel"}>
        <ListeningTime />
        <Version />
      </div>
      <div role={tabNumber === 2 ? "selected-panel" : "panel"}>
        <History />
      </div>
      <div role={tabNumber === 3 ? "selected-panel" : "panel"}>
        <Track />
      </div>
      <div role={tabNumber === 4 ? "selected-panel" : "panel"}>
        <Player />
      </div>
    </div>
  );
};

export default Component;
