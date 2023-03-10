import numeral from "numeral";
import moment from "moment";

import { useStore } from "../State";
import TrackDisplay from "../Components/TrackDisplay";

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
        <TrackDisplay track={track} />

        <table>
          <tr>
            <th>Album Artist</th>
            <td>{track.albumartist}</td>
          </tr>
          <tr>
            <th>Bitrate</th>
            <td>{`${numeral(track.bitrate).format("0a")}bps`}</td>
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
            <th>Length</th>
            <td>{track.readableLength}</td>
          </tr>
          <tr>
            <th>Path on Disk</th>
            <td className="click-to-copy">{track.path}</td>
          </tr>
          <tr>
            <th>Sample Rate</th>
            <td>{numeral(track.samplerate).format("0,0")}Hz</td>
          </tr>
          <tr>
            <th>Track #</th>
            <td>
              {track.track} of {track.tracktotal}
            </td>
          </tr>
          <tr>
            <th>Track ID</th>
            <td>{track.id}</td>
          </tr>
        </table>
      </div>
    );
  }

  return (
    <div className="waiting-text">
      <p>Pick a track to view its information here</p>
    </div>
  );
};

export default Component;
