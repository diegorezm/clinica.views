"use client";

import {
  ColumnFiltersState,
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export type FilterOpts = {
  key: string;
  label: string;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterOpts?: FilterOpts[];
  createFn?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterOpts,
  createFn,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterBy, setFilterBy] = useState<string>(
    filterOpts?.length !== undefined ? filterOpts[0].key : "",
  );
  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnFilters,
    },
  });
  return (
    <div className="rounded-md border">
      <div className="flex justify-between items-center py-4 px-2">
        {filterOpts?.length !== undefined && (
          <div className="flex gap-2">
            <Input
              placeholder="Digite sua busca aqui..."
              value={
                (table.getColumn(filterBy)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn(filterBy)?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />

            <Select value={filterBy} onValueChange={(e) => setFilterBy(e)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder="Procurar por..."
                  defaultValue={filterOpts[0].key}
                />
              </SelectTrigger>
              <SelectContent>
                {filterOpts.map((e, idx) => {
                  return (
                    <SelectItem value={e.key} key={idx}>
                      {e.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}
        {createFn !== undefined && (
          <div>
            <Button onClick={createFn} variant={"default"}>
              <Plus />
            </Button>
          </div>
        )}
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
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
  );
}
