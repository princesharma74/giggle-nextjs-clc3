"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey: string
  placeholder?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  placeholder,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>(
        []
    )
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      columnFilters,
      sorting
    },
  })

  return (
    <div>
        <div className="flex items-center py-4">
            <Input
            placeholder={placeholder ? placeholder : "Search"}
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="w-full"
            />
        </div>
        <div className="rounded-md border">
        <Table>
        <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sortingIcon = header.column.getIsSorted()
                    ? header.column.getIsSorted() === 'asc'
                      ? <ArrowUp className="inline-block w-4 h-4 ml-2" />
                      : <ArrowDown className="inline-block w-4 h-4 ml-2" />
                    : <ArrowUpDown className="inline-block w-4 h-4 ml-2" />

                  return (
                    <TableHead 
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer select-none"
                    >
                      <div className="flex items-center">
                        {header.isPlaceholder
                          ? null
                          : (
                            <>
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {sortingIcon}
                            </>
                          )}
                      </div>
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
            <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                >
                    {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                    ))}
                </TableRow>
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
        </div>
        <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
