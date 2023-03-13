import { FiSun, FiMoon } from "react-icons/fi";
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
          <FiSun /> <span>Light Mode</span>
        </button>
      ) : (
        <button onClick={() => set.preferences.darkMode(true)}>
          <FiMoon /> <span>Dark Mode</span>
        </button>
      )}
    </div>
  );
};
