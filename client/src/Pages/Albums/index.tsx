import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { BiAlbum } from "react-icons/bi";
import numeral from "numeral";

import { trpc, useStore } from "../../State";
import { reactTableSettings } from "../Tracks";

import styles from "./index.module.scss";
import { useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { IoPlayOutline } from "react-icons/io5";

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
            <li>
              {album.counts.tracks} track
              {`${album.counts.tracks > 1 ? "s" : ""}`}
            </li>
            <li>{album.counts.readableTotalLength}</li>
            <li>{album.genre}</li>
            <li>{album.label}</li>
            <li>{album.year}</li>
          </ul>
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
              <td
                style={{
                  width: "60px",
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
                  width: "40px",
                }}
              >
                {_.track}
              </td>
              <td>{_.title}</td>
              <td data-alignment="right" data-font-style="monospaced">
                {_.readableLength}
              </td>
              <td
                data-alignment="right"
                style={{
                  width: "40px",
                }}
              >
                {_.disc}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>Album ID {album.id}</p>
    </div>
  );
};

const Albums = () => {
  const [selectedId, setSelectedId] = useState<number | null>(1259);
  const {
    current: { albums },
    set,
  } = useStore();

  trpc.album.useQuery(selectedId, {
    enabled: Boolean(selectedId),
    onSuccess: (data) => (data ? set.current.album(data) : null),
  });

  return (
    <div className={styles.all}>
      <ul>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={albums.length}
              itemSize={85}
              overscanCount={reactTableSettings.overScanCount}
              style={{
                lineHeight: 1.5,
              }}
            >
              {({ index, style }: { index: number; style: any }) => {
                /**
                 * TODO: Do we need `null` albums?
                 */

                let album = albums.filter((_) => _.name !== "NO_ALBUM")[index];
                let {
                  artist,
                  id,
                  name,
                  year,
                  counts: { tracks, readableTotalLength: length },
                } = album;

                return (
                  <li
                    onClick={() => setSelectedId(id)}
                    key={`album-${name}`}
                    style={style}
                    className={id === selectedId ? styles.active : undefined}
                  >
                    <span>
                      <BiAlbum />
                    </span>

                    <span>
                      <strong>{name}</strong>
                      <em data-artist={artist}>
                        {artist || "(Unknown Artist)"}
                      </em>
                      <span>
                        <span>
                          {tracks} {`${tracks > 1 ? "tracks" : "track"}`}
                        </span>
                        <span>{length}</span>
                        <span>{!year || year === 0 ? "" : year}</span>
                      </span>
                    </span>
                  </li>
                );
              }}
            </List>
          )}
        </AutoSizer>
      </ul>
    </div>
  );
};

const Component = () => (
  <div className={styles.wrapper}>
    <Albums />
    <Album />
  </div>
);

export default Component;
