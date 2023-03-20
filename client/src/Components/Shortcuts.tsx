import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "react-router-dom";

import { useStore } from "../State";

import styles from "./Shortcuts.module.scss";

const LIST: Record<string, string> = {
  d: "Toggle Dark Mode",
  f: "Focus search box",
  g: "Genres",
  a: "Artists",
  l: "Albums",
  t: "Tracks",
  p: "Currently Playing",
  "1": "Browse",
  "2": "Settings",
  "3": "History",
  "4": "Info",
  "5": "Now Playing",
};

export const ShortcutList = () => (
  <div className={styles.component}>
    <table>
      <caption>Shortcuts</caption>
      <tbody>
        {Object.keys(LIST).map((_) => (
          <tr key={`shortcut-${_}`}>
            <th>
              <kbd>{_}</kbd>
            </th>
            <td>{LIST[_]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Component = () => {
  const { set, preferences } = useStore();
  const navigate = useNavigate();

  useHotkeys("d", () => set.preferences.darkMode(!preferences.darkMode));
  useHotkeys("f", () => document.getElementById("search")?.focus(), {
    preventDefault: true,
  });

  useHotkeys("g", () => navigate("/genres"));
  useHotkeys("a", () => navigate("/artists"));
  useHotkeys("l", () => navigate("/albums"));
  useHotkeys("t", () => navigate("/tracks"));
  useHotkeys("b", () => navigate("/"));

  [1, 2, 3, 4, 5].map((_) =>
    useHotkeys(_.toString(), () => set.current.tabNumber(_))
  );

  useHotkeys("p", () => set.current.tabNumber(5));

  return null;
};

export default Component;
