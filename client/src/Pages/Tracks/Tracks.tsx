import { useEffect, useMemo, useRef, useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  Row,
} from "@tanstack/react-table";
import { useVirtual } from "@tanstack/react-virtual";

import { useStore, trpc } from "../../State";
import { TrackInList } from "@rosolli/server";

import styles from "./Tracks.module.scss";
import { useWindowSize } from "../../Components/WindowSizeWarning";

const COLUMN_WIDTHS: Record<string, string> = {
  __meta: "80px",
  title: "350px",
  album: "250px",
  artist: "200px",
  readableLength: "100px",
  track: "80px",
  year: "80px",
};

const Component = () => {
  // Load the data
  const {
    set,
    current: { track: currentTrack, tracks: data },
  } = useStore();

  const { height: windowHeight } = useWindowSize();

  /**
   * This is how one sets up event handling with tRPC. A bit odd but not too
   * bad. We don't care about the result of the query (yet!) and hence don't
   * assign it to anything.
   *
   * Reference:
   * https://github.com/trpc/trpc/discussions/2067#discussioncomment-3211885
   */
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);

  trpc.track.useQuery(selectedId, {
    enabled: Boolean(selectedId),
    onSuccess: (data) => (data ? set.current.track(data) : null),
  });

  trpc.track.useQuery(playingId, {
    enabled: Boolean(playingId),
    onSuccess: (data) => (data ? set.current.playingTrack(data) : null),
  });

  /**
   * Don't show the ID column. Can use this to set visibility of other columns
   * as well (based, for example, on user preferences).
   */
  const [columnVisibility, setColumnVisibility] = useState({
    id: false,
  });

  /**
   * Set up the columns. We use the type definition of the **list of tracks**
   * which is different than the typedef of a single track.
   */
  const columns = useMemo<ColumnDef<TrackInList>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Song ID",
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "album",
        header: "Album",
      },
      {
        accessorKey: "artist",
        header: "Artist",
      },
      {
        accessorKey: "readableLength",
        header: "Length",
      },
      {
        accessorKey: "track",
        header: "Track",
        accessorFn: (row) => `${row.track}/${row.tracktotal}`,
      },
      {
        accessorKey: "year",
        header: "Year",
      },
      // {
      //   accessorKey: "genre",
      //   header: "Genre",
      // },
    ],
    []
  );

  // Create a ref for the container that will hold our table
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Set up React Table. Get the rows to render.
   */
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
    },
    debugTable: true,
  });
  const { rows } = table.getRowModel();

  /**
   * We will have a giant list and will need to virtualize. Set this up.
   */
  const { virtualItems: virtualRows, totalSize } = useVirtual({
    parentRef: containerRef,
    size: data.length,
    overscan: 100,
  });

  /**
   * These are super-important and virtualization just won't work without them!
   * We're setting the available area in the topmost and bottom-most rows to a
   * high value via padding so the virtualizer knows that there is something
   * more to bring into view. If you eliminate these, you'll just be 'stuck'
   * with the first 'page' of virtualized rows.
   *
   * Note that you will have to adjust the `overscan` property depending on how
   * you choose to lay things out. Then you can use something like this to make
   * sure that you only have 'a few' DOM elements (i.e., virtulalization is
   * working as intended (in the developer console))
   *
   *    $(".tracks-container").children[0].querySelectorAll("tbody")[0].querySelectorAll("td").length
   *
   * ☝️ The number you get from that should stabilize and not change after you
   * play around with the track listing!
   */
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <div className={`panel ${styles.component}`}>
      {/* <h1>
        Tracks {windowHeight} -{" "}
        <span>{numeral(data.length).format("0,0")}</span>
      </h1> */}

      <div
        style={{
          overflowY: "scroll",
          height: windowHeight / 2 + "px",
          // height: "70%",
        }}
        ref={containerRef}
      >
        <table>
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    data-column-name={header.column.columnDef.header}
                    /**
                     * NOTE: This does nothing which is a bit surprising to me.
                     * Or maybe I've been laboring under a misapprehension
                     * about how table columns work for the past decade and a
                     * half...
                     */
                    style={{
                      // width: header.column.getSize(),
                      // maxWidth: header.column.getSize(),

                      width: COLUMN_WIDTHS[header.column.id],
                      maxWidth: COLUMN_WIDTHS[header.column.id],
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}

            {virtualRows.map((vrow) => {
              const realRow = rows[vrow.index] as Row<TrackInList>;

              return (
                <tr key={realRow.id}>
                  {realRow.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      onDoubleClick={() =>
                        setPlayingId(cell.row.getValue("id"))
                      }
                      onClick={() => {
                        set.current.tabNumber(4);
                        setSelectedId(cell.row.getValue("id"));
                      }}
                      data-column-name={cell.column.columnDef.header}
                      style={{
                        width: COLUMN_WIDTHS[cell.column.id],
                        maxWidth: COLUMN_WIDTHS[cell.column.id],
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}

            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Component;
