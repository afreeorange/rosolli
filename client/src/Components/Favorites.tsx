import numeral from "numeral";
import { NavLink } from "react-router-dom";

import { useStore } from "../State";
import styles from "./Links.module.scss";

const Component = () => {
  const { statistics } = useStore();

  return (
    <div className={styles.component}>
      <ul>
        <li>
          <NavLink to={"/genres"}>
            <span>Genres</span>
            <span>{numeral(statistics.genres).format("0,0")}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/artists"}>
            <span>Artists</span>
            <span>{numeral(statistics.artists).format("0,0")}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/albums"}>
            <span>Albums</span>
            <span>{numeral(statistics.albums).format("0,0")}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/tracks"}>
            <span>Tracks</span>
            <span>{numeral(statistics.tracks).format("0,0")}</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Component;
