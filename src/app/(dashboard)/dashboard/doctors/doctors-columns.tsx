"use client";
import { ColumnDef } from "@tanstack/react-table";
import Doctor from "../../interfaces/doctor";
import Link from "next/link";

const doctorCols: ColumnDef<Doctor>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => {
      return <Link href="/dashboard/doctors/id">{row.original.name}</Link>;
    },
  },
  {
    accessorKey: "job",
    header: "Função",
  },
  {
    accessorKey: "crm",
    header: "crm",
  },
];
export default doctorCols;
