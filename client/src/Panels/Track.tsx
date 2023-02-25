import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaRecordVinyl } from "react-icons/fa";
import numeral from "numeral";
import moment from "moment";

import { useStore } from "../State";

import styles from "./Track.module.scss";

const Component = () => {
  const {
    current: { track },
    set,
  } = useStore();

  if (track) {
    let modifiedTime = moment(parseInt(track.mtime) * 1000).format(
      "MMM DD YYYY h:MM:SSa"
    );

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

        <h2>
          {}
          {track.title} <span>by {track.artist}</span>
        </h2>
        <h3>
          {track.album} {track.year !== 0 && <span>({track.year})</span>}
        </h3>

        <table>
          <tr>
            <th>Album Artist</th>
            <td>{track.albumartist}</td>
          </tr>
          <tr>
            <th>Bitrate</th>
            <td>{numeral(track.bitrate).format("0a")}</td>
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
            <td>{modifiedTime}</td>
          </tr>
          <tr>
            <th>Path on Disk</th>
            <td className="click-to-copy">{track.path}</td>
          </tr>
          <tr>
            <th>Sample Rate</th>
            <td>{numeral(track.samplerate).format("0,0")} Hz</td>
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
