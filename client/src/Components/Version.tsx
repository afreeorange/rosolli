import { DiGithubAlt } from "react-icons/di";

import packageJson from "../../../package.json";

import styles from "./Version.module.scss";

export default () => (
  <div className={styles.component}>
    <img src="/logo.svg" alt="Rosolli" />
    <div>
      <p>Rosolli v{packageJson.version}</p>
      <p>
        Source <a href={packageJson.homepage}>on GitHub</a> <DiGithubAlt />
      </p>
    </div>
  </div>
);
