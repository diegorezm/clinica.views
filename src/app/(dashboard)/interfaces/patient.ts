import { faker } from "@faker-js/faker";

export default interface Patient {
  id: number;
  name: string;
  phone: string;
  rg: string;
  insurance: string;
  insuranceNumber: string;
}

export function createMockPatient(): Patient {
  return {
    id: faker.number.int({ min: 1, max: 255 }),
    name: faker.person.fullName(),
    phone: faker.phone.number(),
    rg: faker.string.uuid(),
    insurance: faker.company.name(),
    insuranceNumber: faker.string.uuid(),
  };
}

export function generateMockPatients(count: number): Patient[] {
  return Array.from({ length: count }, () => createMockPatient());
}
