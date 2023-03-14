import { HiOutlineEmojiSad } from "react-icons/hi";

import styles from "./NotFound.module.scss";

export default () => (
  <div className={styles.component}>
    <div>
      <HiOutlineEmojiSad />
      <h1>I&#8217;m Sorry.</h1>
      <h2>I could not find that.</h2>
    </div>
  </div>
);
