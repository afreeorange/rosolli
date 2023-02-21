import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  Row,
} from "@tanstack/react-table";

import { useVirtual } from "@tanstack/react-virtual";

import { useStore } from "../State";
import { useMemo, useRef, useState } from "react";
import { TrackInList } from "@rosolli/server";

const Component = () => {
  // Load the data
  const { tracks: data } = useStore();

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
        size: 80,
      },
      {
        accessorKey: "title",
        header: "Title",
        size: 400,
      },
      {
        accessorKey: "album",
        header: "Album",
        size: 400,
      },
      {
        accessorKey: "artist",
        header: "Artist",
        size: 300,
      },
      {
        accessorKey: "readableLength",
        header: "Length",
        size: 80,
      },
      {
        accessorKey: "track",
        header: "Track",
        size: 80,
        accessorFn: (row) => `${row.track}/${row.tracktotal}`,
      },
      {
        accessorKey: "year",
        header: "Year",
        size: 80,
      },
      {
        accessorKey: "genre",
        header: "Genre",
      },
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
   * more to bring into view! If you eliminate these, you'll just be 'stuck'
   * with the first 'page' of virtualized rows.
   */
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <div
      className="panel quadruple-width"
      style={{
        marginRight: "2em",
      }}
    >
      <h1>Tracks</h1>

      <div className="tracks-container" ref={containerRef}>
        <table>
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id}>
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
                      style={{
                        width: cell.column.getSize(),
                        maxWidth: cell.column.getSize(),
                      }}
                      onClick={() =>
                        console.log(
                          `Will play Song ID ${cell.row.getValue("id")}`
                        )
                      }
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
