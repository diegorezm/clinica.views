import { faker } from "@faker-js/faker";
import Doctor from "./doctor";

type DoctorPeriods = "m" | "t" | "n";

export default interface DoctorPeriod {
  doctorId: number;
  period: DoctorPeriods;
}

export function createMockDoctorPeriod(doctor: Doctor): DoctorPeriod {
  const doctorPeriods: DoctorPeriods[] = ["m", "t", "n"];
  return {
    doctorId: doctor.id,
    period: doctorPeriods[faker.number.int({ min: 0, max: 2 })],
  };
}
