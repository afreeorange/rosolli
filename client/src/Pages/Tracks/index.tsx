import Albums from "./Albums";
import Artists from "./Artists";
import Genres from "./Genres";
import Tracks from "./Tracks";

import styles from "./index.module.scss";

export const reactTableSettings = {
  cellHeight: 30,
  overScanCount: 10,
  paddingBottom: "4em",
};

const Component = () => (
  <div className={`${styles.wrapper}`}>
    {/* <div> */}
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
    {/* <div> */}
    <div className={`${styles.bottom}`}>
      <section>
        <Tracks />
      </section>
    </div>
  </div>
);

export default Component;
