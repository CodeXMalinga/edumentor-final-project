"use client";

import { LuLayoutDashboard } from "react-icons/lu";
import { TbBrandProducthunt } from "react-icons/tb";
import { PiUsersFourLight } from "react-icons/pi";
import { useContext } from "react";
import { GlobalContext } from "@/app/context";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: <LuLayoutDashboard size={25} />,
  },
  {
    id: "settings",
    label: "Settings",
    path: "/settings",
    icon: <TbBrandProducthunt size={25} />,
  },
];

type Contexts = any;

export default function Sidebar() {
  const { sideBarOpen, setSideBarOpen } = useContext<Contexts>(GlobalContext);
  const { status } = useSession();

  const pathName = usePathname();
  const router = useRouter();

  const handlenavigate = (getMenuItem: any) => {
    router.push(getMenuItem.path);
  };

  return (
    <aside
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72 flex-col overflow-y-hidden bg-[#fefefe] duration-300 ease-linear lg:static lg:translate-x-0
    ${sideBarOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {menuItems.map((menuItem) => (
                <li key={menuItem.id}>
                  <label
                    onClick={() => handlenavigate(menuItem)}
                    className={`group relative cursor-pointer flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-zinc-400 duration-300 ease-in-out hover:bg-[#4caf50] hover:text-black
                             ${
                               pathName?.includes(menuItem.id) &&
                               "bg-[#08692a] text-black"
                             }
                            `}
                  >
                    {menuItem.icon}
                    {menuItem.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
}
