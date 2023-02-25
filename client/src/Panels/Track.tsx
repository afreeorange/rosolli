import { IoIosCloseCircleOutline } from "react-icons/io";
import numeral from "numeral";

import { useStore } from "../State";

import styles from "./Track.module.scss";

const Component = () => {
  const {
    current: { track },
    set,
  } = useStore();

  if (track) {
    return (
      <div key={track.id} className={`panel ${styles.track}`}>
        <div className={styles.top}>
          <span>Track #{track.id}</span>
          <button onClick={() => set.current.track(null)}>
            <IoIosCloseCircleOutline />
            Close
          </button>
        </div>

        <div
          className={styles["album-art"]}
          style={{
            backgroundColor: "red",
            backgroundImage: `url('${track.cover}')`,
          }}
        ></div>

        <h2>{track.title}</h2>
        <h3>by {track.artist}</h3>
        <h4>
          {track.album} <span>({track.year})</span>
        </h4>

        <table>
          <tr>
            <th>Album Artist</th>
            <td>{track.albumartist}</td>
          </tr>
          <tr>
            <th>Bitrate</th>
            <td>{numeral(track.bitrate).format("0,0")}</td>
          </tr>
          <tr>
            <th>Channels</th>
            <td>{track.channels}</td>
          </tr>
          <tr>
            <th>Disc</th>
            <td>
              {track.disc} of {track.disctotal}
            </td>
          </tr>
          <tr>
            <th>Encoder</th>
            <td>{track.encoder}</td>
          </tr>
          <tr>
            <th>Format</th>
            <td>{track.format}</td>
          </tr>
          <tr>
            <th>Genre</th>
            <td>{track.genre}</td>
          </tr>
          <tr>
            <th>Label</th>
            <td>{track.label}</td>
          </tr>
          <tr>
            <th>Last Modified</th>
            <td>{track.mtime}</td>
          </tr>
          <tr>
            <th>path</th>
            <td>{track.path.toString()}</td>
          </tr>
          <tr>
            <th>Sample Rate</th>
            <td>{numeral(track.samplerate).format("0,0")}</td>
          </tr>
          <tr>
            <th>Track #</th>
            <td>
              {track.track} of {track.tracktotal}
            </td>
          </tr>
          <tr>
            <th>Length</th>
            <td>{track.readableLength}</td>
          </tr>
        </table>
      </div>
    );
  }

  return null;
};

export default Component;
