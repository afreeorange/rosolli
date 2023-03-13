import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "react-router-dom";

import { useStore } from "../State";

import styles from "./Shortcuts.module.scss";

export const ShortcutList = () => (
  <div className={styles.component}>
    <table>
      <caption>Shortcuts</caption>
      <tbody>
        <tr>
          <th>
            <kbd>d</kbd>
          </th>
          <td>Toggle Dark Mode</td>
        </tr>
        <tr>
          <th>
            <kbd>f</kbd>
          </th>
          <td>Focus search box</td>
        </tr>
        <tr>
          <th>
            <kbd>g</kbd>
          </th>
          <td>Genres</td>
        </tr>
        <tr>
          <th>
            <kbd>a</kbd>
          </th>
          <td>Artists</td>
        </tr>
        <tr>
          <th>
            <kbd>l</kbd>
          </th>
          <td>Albums</td>
        </tr>
        <tr>
          <th>
            <kbd>t</kbd>
          </th>
          <td>Tracks</td>
        </tr>
        <tr>
          <th>
            <kbd>b</kbd>
          </th>
          <td>Column Browse</td>
        </tr>
        <tr>
          <th>
            <kbd>1</kbd>
          </th>
          <td>Browse</td>
        </tr>
        <tr>
          <th>
            <kbd>2</kbd>
          </th>
          <td>Settings</td>
        </tr>
        <tr>
          <th>
            <kbd>3</kbd>
          </th>
          <td>History</td>
        </tr>
        <tr>
          <th>
            <kbd>4</kbd>
          </th>
          <td>Info</td>
        </tr>
        <tr>
          <th>
            <kbd>5</kbd>
          </th>
          <td>Now Playing</td>
        </tr>
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

  return null;
};

export default Component;
