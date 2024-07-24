"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ClipboardMinus,
  LogOut,
  LucideIcon,
  Menu,
  Paperclip,
  User,
  Users,
} from "lucide-react";
import SidebarItem from "./components/sidebar/sidebar-item";
import { usePathname } from "next/navigation";

type SidebarItem = {
  label: string;
  route: string;
  Icon: LucideIcon;
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathaname = usePathname();
  const sidebarItems: SidebarItem[] = [
    {
      label: "Médicos",
      route: "/dashboard/doctors",
      Icon: ClipboardMinus,
    },
    {
      label: "Pacientes",
      route: "",
      Icon: Users,
    },
    {
      label: "Atendimentos",
      route: "",
      Icon: Paperclip,
    },
  ];
  return (
    <>
      <Sheet>
        <div className="flex items-center w-full bg-secondary">
          <SheetTrigger className="p-2">
            <Menu />
          </SheetTrigger>
        </div>
        <SheetContent side={"left"} className="flex flex-col justify-between">
          <ul className="my-4">
            {sidebarItems.map((item, idx) => {
              return (
                <SidebarItem
                  key={idx + 1}
                  label={item.label}
                  route={item.route}
                  active={pathaname === item.route}
                  Icon={item.Icon}
                />
              );
            })}
          </ul>
          <ul>
            <SidebarItem
              label="Perfil"
              route={""}
              active={pathaname === "/dashboard/profile"}
              Icon={User}
            />
            <SidebarItem
              label="Logout"
              route={""}
              active={false}
              Icon={LogOut}
            />
          </ul>
        </SheetContent>
      </Sheet>
      <main className="p-2">{children}</main>
    </>
  );
}
