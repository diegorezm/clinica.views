import { generateMockDoctors } from "../../interfaces/doctor";
import doctorCols from "./doctors-columns";
import { DataTable, FilterOpts } from "@/components/data-table";

export default function DoctorsPage() {
  const doctors = generateMockDoctors(10);
  const filterOpts: FilterOpts[] = [
    { key: "name", label: "Nome" },
    { key: "job", label: "Função" },
  ];
  return (
    <div>
      <DataTable columns={doctorCols} data={doctors} filterOpts={filterOpts} />
    </div>
  );
}
