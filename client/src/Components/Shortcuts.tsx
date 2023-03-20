import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "react-router-dom";

import { useStore } from "../State";

import styles from "./Shortcuts.module.scss";

// You can have more than one shortcut for an action.
const LIST: Record<string, string[]> = {
  "Toggle Dark Mode": ["d"],
  "Focus search box": ["f", "/"],
  Genres: ["g"],
  Artists: ["a"],
  Albums: ["l"],
  Tracks: ["t"],
  Browse: ["1", "b"],
  Settings: ["2", "s"],
  History: ["3", "h"],
  Info: ["4", "i"],
  "Currently Playing": ["5", "p"],
};

export const ShortcutList = () => (
  <div className={styles.component}>
    <table>
      <caption>Shortcuts</caption>
      <tbody>
        {Object.keys(LIST).map((_) => (
          <tr key={`shortcut-${_}`}>
            <th>{_}</th>
            <td>
              {LIST[_].map((__) => (
                <kbd>{__}</kbd>
              ))}
            </td>
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
  useHotkeys("/", () => document.getElementById("search")?.focus(), {
    preventDefault: true,
  });

  useHotkeys("g", () => navigate("/genres"));
  useHotkeys("a", () => navigate("/artists"));
  useHotkeys("l", () => navigate("/albums"));
  useHotkeys("t", () => navigate("/tracks"));

  const _: [number, string][] = [
    [1, "b"],
    [2, "s"],
    [3, "h"],
    [4, "i"],
    [5, "p"],
  ];

  _.map(([a, b]: [number, string]) => {
    useHotkeys(a.toString(), () => set.current.tabNumber(a));
    useHotkeys(b, () => set.current.tabNumber(a));
  });

  return null;
};

export default Component;
