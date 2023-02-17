import Links from "../Links";
import styles from "./Main.module.scss";

const Component = () => {
  return (
    <div className={`${styles.main} panel`}>
      <Links />
    </div>
  );
};

export default Component;
