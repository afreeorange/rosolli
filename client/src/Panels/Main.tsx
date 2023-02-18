import Links from "../Components/Links";
import Search from "../Components/Search";
import ListeningTime from "../Components/ListeningTime";

import styles from "./Main.module.scss"

const Component = () => {
  return (
    <div className={styles.main}>
      <Search />
      <Links />
      <ListeningTime />
    </div>
  );
};

export default Component;
