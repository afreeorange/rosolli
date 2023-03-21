import { useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { IoPlayOutline } from "react-icons/io5";
import { AiOutlineStar } from "react-icons/ai";
import { BsDisc } from "react-icons/bs";
import { BiAlbum } from "react-icons/bi";

import { trpc, useStore } from "../../State";

import styles from "./Album.module.scss";
import { FaHashtag } from "react-icons/fa";

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
          <button onClick={() => console.log(album.tracks)}>
            <MdPlaylistAdd /> Enqueue
          </button>
          <button onClick={() => console.log(album.tracks)}>
            <IoPlayOutline /> Play
          </button>
          <button>
            <AiOutlineStar /> Favorite
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th data-alignment="right">Length</th>
            <th data-alignment="right">
              <FaHashtag />
            </th>
            <th data-alignment="right">
              <BsDisc />
            </th>
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
              className={
                selectedId && _.id === selectedId ? styles.active : undefined
              }
            >
              {/* NOTE: These are based on --panel-size x 2 */}
              <td
                style={{
                  width: "90px",
                  maxWidth: "90px",
                }}
              >
                <div className={styles.buttons}>
                  <button>
                    <MdPlaylistAdd />
                  </button>
                  <button>
                    <IoPlayOutline />
                  </button>
                  <button>
                    <AiOutlineStar />
                  </button>
                </div>
              </td>
              <td
                data-trim-text
                style={{
                  width: "330px",
                  maxWidth: "330px",
                }}
              >
                {_.title}
              </td>
              <td
                data-alignment="right"
                data-font-style="monospaced"
                style={{
                  width: "100px",
                  maxWidth: "100px",
                }}
              >
                {_.readableLength}
              </td>
              <td
                data-font-style="monospaced"
                data-alignment="right"
                style={{
                  width: "35px",
                  maxWidth: "35px",
                }}
              >
                {_.track}
              </td>
              <td
                data-alignment="right"
                style={{
                  width: "25px",
                  maxWidth: "25px",
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
