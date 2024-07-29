import { DataTable } from "@/components/data-table";
import appointmentCols from "./appointments-columns";
import { generateMockAppointments } from "../../interfaces/appointment";

export default function AppointmentPage() {
  const appointments = generateMockAppointments(10);
  return (
    <div>
      <DataTable columns={appointmentCols} data={appointments} />
    </div>
  );
}
