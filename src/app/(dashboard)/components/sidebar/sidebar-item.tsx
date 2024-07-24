import { type LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  label: string;
  route: string;
  Icon: LucideIcon;
  active: boolean;
};

export default function SidebarItem({ label, route, Icon, active }: Props) {
  return (
    <li className="text-3xl my-2 w-full">
      <Link
        href={route}
        className={`flex items-center gap-2 hover:bg-secondary rounded-full p-2 w-full ${active && "bg-secondary"}`}
      >
        <Icon size={25} />
        <span>{label}</span>
      </Link>
    </li>
  );
}
