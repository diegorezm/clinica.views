"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createMockDoctor } from "@/app/(dashboard)/interfaces/doctor";
import DoctorWorkDay, {
  createMockDoctorWorkDays,
} from "@/app/(dashboard)/interfaces/doctor-work-days";
import { useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function getDaysInMonth(year: number, month: number) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = [];

  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push(new Date(year, month, day));
  }

  return daysArray;
}

function getDoctorWorkDaysInMonth(
  doctorWorkDays: DoctorWorkDay[],
  year: number,
  month: number,
) {
  const daysInMonth = getDaysInMonth(year, month);
  const workDayNames = doctorWorkDays.map((day) => day.day.toLowerCase());

  return daysInMonth.filter((date) =>
    workDayNames.includes(
      date.toLocaleDateString("pt-BR", { weekday: "long" }).toLowerCase(),
    ),
  );
}

function filterFutureDates(dates: Date[]) {
  const now = new Date();
  return dates.filter((date) => date >= now);
}

export default function DoctorPage() {
  const doctor = useMemo(() => createMockDoctor(), []);
  const doctorWorkDays = useMemo(
    () => createMockDoctorWorkDays({ doctor: doctor, qtd: 3 }),
    [doctor],
  );

  const [showPastDays, setShowPastDays] = useState<boolean>(false);
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [selectedDay, setSelectedDay] = useState<string>("");

  const availableWorkDays = useMemo(
    () => getDoctorWorkDaysInMonth(doctorWorkDays, currentYear, selectedMonth),
    [doctorWorkDays, currentYear, selectedMonth],
  );

  const futureWorkDays = useMemo(
    () => filterFutureDates(availableWorkDays),
    [availableWorkDays],
  );

  const workDaysOptions = useMemo(
    () =>
      Array.from(
        new Set(doctorWorkDays.map((day) => day.day.toLocaleString())),
      ),
    [doctorWorkDays],
  );

  const filteredDays = useMemo(
    () =>
      (showPastDays ? availableWorkDays : futureWorkDays).filter(
        (date) =>
          date.toLocaleDateString("pt-BR", { weekday: "long" }) === selectedDay,
      ),
    [availableWorkDays, futureWorkDays, selectedDay, showPastDays],
  );
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <h1>{doctor.name}</h1>
      <Select
        value={selectedMonth.toString()}
        onValueChange={(e) => setSelectedMonth(Number(e))}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione um mês..." />
        </SelectTrigger>
        <SelectContent>
          {months.map((month, idx) => (
            <SelectItem value={idx.toString()} key={idx}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={selectedDay} onValueChange={(e) => setSelectedDay(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione um dia..." />
        </SelectTrigger>
        <SelectContent>
          {workDaysOptions.map((day, idx) => (
            <SelectItem value={day} key={idx}>
              {day}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <Checkbox
          id="show-past"
          onCheckedChange={() => setShowPastDays(!showPastDays)}
        />
        <Label htmlFor="show-past">Mostrar todas as datas</Label>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDays.map((e, idx) => (
            <TableRow key={idx + 1}>
              <TableCell>{e.toLocaleDateString("pt-BR")}</TableCell>
            </TableRow>
          ))}
          {filteredDays.length === 0 && (
            <TableRow>
              <TableCell colSpan={2} className="h-24 text-center">
                Nenhum resultado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
