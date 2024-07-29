import { faker } from "@faker-js/faker";
import Doctor from "./doctor";

type DayOfWeek =
  | "segunda-feira"
  | "terça-feira"
  | "quarta-feira"
  | "quinta-feira"
  | "sexta-feira"
  | "sábado";

const daysOfWeek: DayOfWeek[] = [
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];

export default interface DoctorWorkDay {
  doctorId: number;
  day: DayOfWeek;
}

export function createMockDoctorWorkDay(doctor: Doctor): DoctorWorkDay {
  return {
    doctorId: doctor.id,
    day: daysOfWeek[faker.number.int({ min: 1, max: 6 })],
  };
}

export function createMockDoctorWorkDays({
  doctor,
  qtd,
}: {
  doctor: Doctor;
  qtd: number;
}): DoctorWorkDay[] {
  if (qtd < 1 || qtd > 6) {
    return [];
  }

  const workDays: DoctorWorkDay[] = [];
  const usedDays = new Set<string>();
  while (workDays.length < qtd) {
    const randomDay =
      daysOfWeek[faker.number.int({ min: 0, max: daysOfWeek.length - 1 })];

    if (!usedDays.has(randomDay)) {
      usedDays.add(randomDay);
      workDays.push({
        doctorId: doctor.id,
        day: randomDay,
      });
    }
  }
  return workDays;
}
