import { useStore } from "../State";

import styles from "./ListeningTime.module.scss";

const Component = () => {
  const {
    statistics: { listeningTime: l },
  } = useStore();

  if (l) {
    return (
      <div className={styles.component}>
        <p>
          You have{" "}
          {l.years > 0 && `${l.years} year${l.years !== 1 ? "s" : ""}, `}{" "}
          {l.months > 0 && `${l.months} month${l.months !== 1 ? "s" : ""}, `}{" "}
          {l.days > 0 && `${l.days} day${l.days !== 1 ? "s" : ""}, `}{" "}
          {l.hours > 0 && `${l.hours} hour${l.hours !== 1 ? "s" : ""}, `}{" "}
          {l.minutes > 0 &&
            `${l.minutes} minute${l.minutes !== 1 ? "s" : ""}, `}
          {" and "}
          {l.seconds > 0 &&
            `${l.seconds} second${l.seconds !== 1 ? "s" : ""}`}{" "}
          of media.
        </p>
      </div>
    );
  }

  return null;
};

export default Component;
