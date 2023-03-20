import { useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { IoPlayOutline } from "react-icons/io5";
import { BiAlbum } from "react-icons/bi";

import { trpc, useStore } from "../../State";

import styles from "./Album.module.scss";

const Album = () => {
  const {
    current: { album },
    set,
  } = useStore();

  const [selectedId, setSelectedId] = useState<number | null>(null);

  trpc.track.useQuery(selectedId, {
    enabled: Boolean(selectedId),
    onSuccess: (data) => (data ? set.current.track(data) : null),
  });

  if (!album) {
    return (
      <div className={`${styles.one} waiting-text`}>
        Select an album to view more information about it.
      </div>
    );
  }

  return (
    <div className={styles.one}>
      <div>
        <div>
          <BiAlbum />
        </div>

        <div>
          <h1>{album.name}</h1>
          <h2>{album.artist}</h2>
          <ul>
            <li>{album.counts.readableTotalLength}</li>
            {album.genre ? <li>{album.genre}</li> : null}
            {album.year && album.year !== 0 ? <li>{album.year}</li> : null}
            {album.label ? <li>{album.label}</li> : null}
          </ul>
          <button>
            <MdPlaylistAdd /> Enqueue Album
          </button>
          <button>
            <IoPlayOutline /> Play Album
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th></th>
            <th data-alignment="right">#</th>
            <th>Title</th>
            <th data-alignment="right">Length</th>
            <th data-alignment="right">Disc</th>
          </tr>
        </thead>
        <tbody>
          {album.tracks?.map((_) => (
            <tr
              key={_.id}
              onClick={() => {
                set.current.tabNumber(4);
                setSelectedId(_.id);
              }}
            >
              {/* NOTE: These are based on --panel-size x 2 */}
              <td
                style={{
                  width: "4em",
                  maxWidth: "4em",
                }}
              >
                <div className={styles.buttons}>
                  <button>
                    <MdPlaylistAdd />
                  </button>{" "}
                  <button>
                    <IoPlayOutline />
                  </button>
                </div>
              </td>
              <td
                data-font-style="monospaced"
                data-alignment="right"
                style={{
                  width: "3em",
                  maxWidth: "3em",
                }}
              >
                {_.track}
              </td>
              <td
                data-trim-text
                style={{
                  width: "32em",
                  maxWidth: "32em",
                }}
              >
                {_.title}
              </td>
              <td data-alignment="right" data-font-style="monospaced">
                {_.readableLength}
              </td>
              <td
                data-alignment="right"
                style={{
                  width: "3em",
                  maxWidth: "3em",
                }}
              >
                {_.disc}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className={styles.albumId}>Album ID {album.id}</p>
    </div>
  );
};

export default Album;
