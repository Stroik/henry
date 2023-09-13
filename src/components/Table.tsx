import {
  OnChangeFn,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { IconArrowLeft, IconArrowRight } from "./Icons";
import { Ranking } from "@/types/Ranking";

type Data = {
  rows: Ranking[];
  pageCount: number;
};

interface Props {
  data: Data;
  columns: Array<any>;
  pagination: PaginationState;
  setPagination: OnChangeFn<PaginationState>;
}

export const Table = ({ columns, data, pagination, setPagination }: Props) => {
  const table = useReactTable({
    data: data?.rows,
    columns,
    pageCount: data?.pageCount ?? -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} style={{ width: header.getSize() }}>
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center font-avenir"
                >
                  No results for tour/season combination
                </td>
              </tr>
            )}
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          data-testid="previous-page"
        >
          <IconArrowLeft />
        </button>
        <span>
          <strong data-testid="current-page">
            {table.getState().pagination.pageIndex + 1}{" "}
          </strong>{" "}
          de
          <strong> {table.getPageCount()}</strong>
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          data-testid="next-page"
        >
          <IconArrowRight />
        </button>
        <span className="total">
          {data?.rows.length * data?.pageCount} items
        </span>
      </div>
    </>
  );
};
