import { BiGitBranch } from "react-icons/bi";
import { AiOutlineHistory } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { IoPlay } from "react-icons/io5";
import { BsCassette } from "react-icons/bs";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import Links from "../Components/Links";
import Search from "../Components/Search";
import ListeningTime from "../Components/ListeningTime";
import Player from "../Components/Player";
import Track from "./Track";
import { useStore } from "../State";

import styles from "./Main.module.scss";

const Component = () => {
  const {
    current: { tabNumber },
    set,
  } = useStore();

  return (
    <div className={styles.main}>
      <Search />

      <Tabs
        selectedIndex={tabNumber}
        className={styles.tabs}
        onSelect={set.current.tabNumber}
      >
        <TabList>
          <Tab>
            <BiGitBranch />
          </Tab>
          <Tab>
            <FiSettings />
          </Tab>
          <Tab>
            <AiOutlineHistory />
          </Tab>
          <Tab>
            <BsCassette />
          </Tab>
          <Tab>
            <IoPlay />
          </Tab>
        </TabList>

        <TabPanel
          className={styles.panel}
          selectedClassName={styles["panel-selected"]}
        >
          <Links />
        </TabPanel>
        <TabPanel
          className={styles.panel}
          selectedClassName={styles["panel-selected"]}
        >
          <ListeningTime />
        </TabPanel>
        <TabPanel
          className={styles.panel}
          selectedClassName={styles["panel-selected"]}
        >
          <h2>History</h2>
        </TabPanel>
        <TabPanel
          className={styles.panel}
          selectedClassName={styles["panel-selected"]}
        >
          <Track />
        </TabPanel>
        <TabPanel
          className={styles.panel}
          selectedClassName={styles["panel-selected"]}
          forceRender
        >
          <h2>Now Playing</h2>
          <Player />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Component;
