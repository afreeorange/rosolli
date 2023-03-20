import Albums from "./AlbumsPanel";
import Artists from "./ArtistsPanel";
import Genres from "./GenresPanel";
import Tracks from "./TracksPanel";
import { useStore } from "../../State";

import styles from "./index.module.scss";

export const reactTableSettings = {
  cellHeight: 30,
  overScanCount: 10,
  paddingBottom: "4em",
};

const Component = () => {
  const { showingSearchResults } = useStore();

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.top}`}
        style={{
          /** Don't unmount this entirely when searching! */
          display: showingSearchResults ? "none" : "grid",
        }}
      >
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
        <section>
          <Tracks />
        </section>
      </div>
    </div>
  );
};

export default Component;
