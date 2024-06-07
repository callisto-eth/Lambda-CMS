import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface DataTableProps<TData, TValue> {
  tableColumns: ColumnDef<TData, TValue>[];
  tableData: TData[];
}

export function DataTable<TData, TValue>({
  tableColumns,
  tableData,
}: DataTableProps<TData, TValue>) {
  const dataTable = useReactTable({
    data: tableData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full border rounded-2xl border-gray-100 border-opacity-10">
      <Table className="*:font-DM-Sans text-base">
        <TableHeader className="border-b">
          {dataTable.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="border-r-[1px] last:border-r-0 border-gray-100 border-opacity-10 border-b-0"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {dataTable.getRowModel().rows?.length ? (
            dataTable.getRowModel().rows.map((row) => (
              <TableRow
                className="border-gray-100 border-opacity-10"
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="border-r-[1px] last:border-r-0 border-gray-100 border-opacity-10"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={tableColumns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
