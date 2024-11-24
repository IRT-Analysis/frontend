import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { TableData } from '@/types/table_data.type'

const columnHelper = createColumnHelper<TableData>()

const columns = [
  columnHelper.accessor('label', {
    header: 'Label',
    cell: (props) => <p>{props.getValue()}</p>,
  }),
  columnHelper.accessor('A', {
    header: 'A',
    cell: (props) => <p>{props.getValue()}</p>,
  }),
  columnHelper.accessor('B', {
    header: 'B',
    cell: (props) => <p>{props.getValue()}</p>,
  }),
  columnHelper.accessor('C', {
    header: 'C',
    cell: (props) => <p>{props.getValue()}</p>,
  }),
  columnHelper.accessor('D', {
    header: 'D',
    cell: (props) => <p>{props.getValue()}</p>,
  }),
  columnHelper.accessor('*', {
    header: '*',
    cell: (props) => <p>{props.getValue()}</p>,
  }),
]

const Table = ({ data }: { data: TableData[] }) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      <div>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
