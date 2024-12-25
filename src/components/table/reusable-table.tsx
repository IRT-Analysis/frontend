'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'
import * as React from 'react'

import AutoPagination from '@/components/auto-paginations'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Collapsible } from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Spinner from '@/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
type CollapsibleRowProps<T> = {
  row: Row<T>
  isSelected: boolean
  collapsibleContent?: (rowIndex: number) => React.ReactNode
}

function CollapsibleRow<T>({
  row,
  isSelected,
  collapsibleContent,
}: CollapsibleRowProps<T>) {
  return (
    <Collapsible asChild>
      <>
        <TableRow data-state={isSelected && 'selected'}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
        {collapsibleContent && collapsibleContent(row.index)}
      </>
    </Collapsible>
  )
}

const MemoizedCollapsibleRow = React.memo(CollapsibleRow) as <T>(
  props: CollapsibleRowProps<T>
) => JSX.Element

export function ReusableTable<T>({
  searchBy,
  columns,
  data,
  collapsibleContent,
  isPending,
}: {
  searchBy?: (keyof T)[]
  columns: ColumnDef<T>[]
  data: T[]
  isPending?: boolean
  collapsibleContent?: (_row: number) => JSX.Element
}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    if (searchBy) {
      searchBy.forEach((columnKey) => {
        table.getColumn(columnKey.toString())?.setFilterValue(searchValue) // Apply filter to each column
      })
    }
  }

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: { pagination: { pageSize: data.length / Math.pow(2, 3) } },
  })

  return isPending ? (
    <Card className="flex h-full items-center justify-center">
      <CardContent>
        <Spinner />
      </CardContent>
    </Card>
  ) : (
    <Card className="flex grow">
      <CardContent>
        <div className="flex items-center py-4">
          {searchBy && (
            <Input
              placeholder={`Search by ${searchBy.join(', ')}...`}
              value={searchBy
                .map(
                  (key) =>
                    table.getColumn(key.toString())?.getFilterValue() as string
                )
                .join(' ')}
              onChange={handleSearchChange}
              className="max-w-sm"
            />
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        style={{
                          width: header.column.columnDef.size || 'auto',
                        }}
                        className="text-center"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table
                  .getRowModel()
                  .rows.map((row) => (
                    <MemoizedCollapsibleRow<T>
                      key={row.id}
                      row={row}
                      isSelected={row.getIsSelected()}
                      collapsibleContent={collapsibleContent}
                    />
                  ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex flex-1 items-center gap-2 py-4 text-xs text-muted-foreground">
            <div>Hiển thị</div>
            <Select
              defaultValue={Math.floor(
                table.getPrePaginationRowModel().rows.length / Math.pow(2, 3)
              ).toString()}
              onValueChange={(e) => table.setPageSize(+e)}
            >
              <SelectTrigger className="w-fit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 4 }, (_, index) =>
                  Math.floor(
                    table.getPrePaginationRowModel().rows.length /
                      Math.pow(2, index)
                  )
                )
                  .reverse()
                  .map((value, index) => (
                    <SelectItem key={index} value={value.toString()}>
                      {value}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <div>
              trong{' '}
              <strong>{table.getPrePaginationRowModel().rows.length}</strong>{' '}
              kết quả
            </div>
          </div>
          {data.length ? (
            <div>
              <AutoPagination
                page={table.getState().pagination.pageIndex + 1}
                pageSize={table.getPageCount()}
                isLink={false}
                // pathname="/analysis/items"
                onClick={(pageIndex) => table.setPageIndex(pageIndex - 1)}
              />
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
