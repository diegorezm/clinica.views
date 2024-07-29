import { faker } from "@faker-js/faker";

export default interface Doctor {
  id: number;
  name: string;
  job: string;
  crm: string;
  createdAt: Date;
  updatedAt: Date;
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateDoctorCrm() {
  let crm: string = "";
  for (let index = 0; index < 8; index++) {
    const n = randomIntFromInterval(index, 8);
    crm += n;
  }
  return crm;
}

export function createMockDoctor(): Doctor {
  const jobs = [
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Pediatrician",
    "Surgeon",
  ];

  const createdAt = faker.date.past();
  const updatedAt = faker.date.past();
  return {
    id: faker.number.int({ min: 1, max: 255 }),
    name: faker.person.fullName(),
    job: jobs[Math.floor(Math.random() * jobs.length)],
    crm: generateDoctorCrm(),
    createdAt,
    updatedAt,
  };
}

export function generateMockDoctors(count: number): Doctor[] {
  const doctors: Doctor[] = [];
  for (let i = 0; i < count; i++) {
    doctors.push(createMockDoctor());
  }
  return doctors;
}
