import Albums from "./Albums";
import Artists from "./Artists";
import Genres from "./Genres";
import Tracks from "./Tracks";

import styles from "./index.module.scss";

const Component = () => (
  <div className={`${styles.wrapper}`}>
    <div className={`${styles.top}`}>
      <section>
        <Genres />
      </section>
      <section>
        <Artists />
      </section>
      <section>
        <Albums />
      </section>
    </div>
    <div className={`${styles.bottom}`}>
      <Tracks />
    </div>
  </div>
);

export default Component;
