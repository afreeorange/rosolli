import numeral from "numeral";
import { MdOutlineAccountTree } from "react-icons/md";

import { useStore } from "./State";
import styles from "./Links.module.scss";

const Component = () => {
  const { statistics } = useStore();

  return (
    <div className={styles.links}>
      <ul>
        <li>
          <span>Genres</span>
          <span>{numeral(statistics.genres).format("0,0")}</span>
        </li>
        <li>
          <span>Artists</span>
          <span>{numeral(statistics.artists).format("0,0")}</span>
        </li>
        <li>
          <span>Albums</span>
          <span>{numeral(statistics.albums).format("0,0")}</span>
        </li>
        <li>
          <span>Songs</span>
          <span>{numeral(statistics.songs).format("0,0")}</span>
        </li>
      </ul>
    </div>
  );
};

export default Component;
