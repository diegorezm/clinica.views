"use client";
import { ColumnDef } from "@tanstack/react-table";
import Doctor from "../../interfaces/doctor";

const doctorCols: ColumnDef<Doctor>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "Nome",
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
