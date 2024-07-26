"use client";
import { ColumnDef } from "@tanstack/react-table";
import Patient from "../../interfaces/patient";

const patientCols: ColumnDef<Patient>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "rg",
    header: "RG",
  },
  {
    accessorKey: "insurance",
    header: "Seguro",
  },
];
export default patientCols;
