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

export function generateMockDoctors(count: number): Doctor[] {
  const jobs = [
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Pediatrician",
    "Surgeon",
  ];
  const names = [
    "John Doe",
    "Jane Smith",
    "Emily Johnson",
    "Michael Brown",
    "Sarah Davis",
  ];

  const doctors: Doctor[] = [];

  for (let i = 0; i < count; i++) {
    const createdAt = new Date();
    const updatedAt = new Date();
    doctors.push({
      id: i + 1,
      name: names[Math.floor(Math.random() * names.length)],
      job: jobs[Math.floor(Math.random() * jobs.length)],
      crm: generateDoctorCrm(),
      createdAt,
      updatedAt,
    });
  }

  return doctors;
}
