import { useStore } from "../State";
import Logo from "./Logo";

import styles from "./Loading.module.scss";

export default () => {
  const { loading } = useStore();

  if (loading) {
    return (
      <div className={styles.component}>
        <Logo />
        <p>Hang on&hellip;</p>
      </div>
    );
  }

  return null;
};
