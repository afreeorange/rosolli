import { useEffect, useState } from "react";
import { SlSizeFullscreen } from "react-icons/sl";

import styles from "./WindowSizeWarning.module.scss";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

export default () => {
  const w = useWindowSize();

  if (w.width < 1000 || w.height < 900) {
    return (
      <div className={styles.component}>
        <div>
          <SlSizeFullscreen />
          <p>
            I need a minimum viewport size of 1000 by 900 pixels. Please stretch
            me until I go away.
          </p>
          <p>
            <small>
              You're at{" "}
              <span data-color={w.width < 1000 ? "red" : undefined}>
                {w.width}
              </span>
              {" "}by{" "}
              <span data-color={w.height < 900 ? "red" : undefined}>
                {w.height}
              </span>
            </small>
          </p>
        </div>
      </div>
    );
  }

  return null;
};
