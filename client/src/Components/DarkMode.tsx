import { FiSun, FiMoon } from "react-icons/fi";
import { TbBulbOff, TbBulb } from "react-icons/tb";
import { useStore } from "../State";

import styles from "./DarkMode.module.scss";

export default () => {
  const {
    preferences: { darkMode },
    set,
  } = useStore();

  return (
    <div className={styles.component}>
      {darkMode ? (
        <button onClick={() => set.preferences.darkMode(false)}>
          <TbBulb /> <span>Light Mode</span>
        </button>
      ) : (
        <button onClick={() => set.preferences.darkMode(true)}>
          <TbBulbOff /> <span>Dark Mode</span>
        </button>
      )}
    </div>
  );
};
