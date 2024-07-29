import { faker } from "@faker-js/faker";

export default interface Appointment {
  patient: string;
  doctor: string;
  appointmentDate: Date;
  status: "f" | "fj" | "fm" | "ok";
}
const statuses = ["f", "fj", "fm", "ok"] as const;

export function generateMockAppointments(count: number): Appointment[] {
  const appointments: Appointment[] = [];

  for (let i = 0; i < count; i++) {
    const appointmentDate = faker.date.future();
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    appointments.push({
      patient: faker.person.fullName(),
      doctor: faker.person.fullName(),
      appointmentDate,
      status,
    });
  }

  return appointments;
}
