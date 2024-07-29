"use client";
import { ColumnDef } from "@tanstack/react-table";
import Appointment from "../../interfaces/appointment";

const getStatusText = (status: "f" | "fj" | "fm" | "ok") => {
  switch (status) {
    case "ok":
      return "OK";
    case "f":
      return "Falta";
    case "fj":
      return "Falta Justificada";
    case "fm":
      return "Falta do Médico";
    default:
      return "Desconhecido";
  }
};

const getStatusColor = (status: "f" | "fj" | "fm" | "ok") => {
  switch (status) {
    case "ok":
      return "text-green-500";
    case "f":
      return "text-red-500";
    case "fj":
    case "fm":
      return "text-orange-500";
    default:
      return "text-gray-500";
  }
};

const appointmentCols: ColumnDef<Appointment>[] = [
  {
    accessorKey: "doctor",
    header: "Medico",
  },
  {
    accessorKey: "patient",
    header: "Paciente",
  },
  {
    accessorKey: "appointmentDate",
    header: "data",
    cell: ({ row }) => {
      const d = row.original.appointmentDate.toLocaleDateString();
      return d;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColor = getStatusColor(status);
      return <div className={statusColor}>{getStatusText(status)}</div>;
    },
  },
];
export default appointmentCols;
