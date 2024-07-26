"use client";
import { DataTable, FilterOpts } from "@/components/data-table";
import patientCols from "./patients-columns";
import Patient, {
  createMockPatient,
  generateMockPatients,
} from "../../interfaces/patient";
import { useState } from "react";

export default function PatientPage() {
  const filteropts: FilterOpts[] = [
    {
      key: "name",
      label: "Nome",
    },
    {
      key: "rg",
      label: "RG",
    },
  ];
  const [patients, setPatients] = useState<Patient[]>(generateMockPatients(10));
  const createFn = () => {
    const patient = createMockPatient();
    setPatients([...patients, patient]);
  };
  return (
    <div>
      <DataTable
        columns={patientCols}
        data={patients}
        createFn={createFn}
        filterOpts={filteropts}
      />
    </div>
  );
}
