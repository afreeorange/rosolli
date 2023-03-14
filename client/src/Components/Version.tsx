import { DiGithubAlt } from "react-icons/di";

import packageJson from "../../../package.json";
import { useStore } from "../State";
import Logo from "./Logo";

import styles from "./Version.module.scss";

export default () => {
  const {
    preferences: { darkMode },
  } = useStore();

  return (
    <div className={styles.component}>
      <Logo />
      <div>
        <p>Rosolli v{packageJson.version}</p>
        <p>
          Source <a href={packageJson.homepage}>on GitHub</a> <DiGithubAlt />
        </p>
      </div>
    </div>
  );
};
