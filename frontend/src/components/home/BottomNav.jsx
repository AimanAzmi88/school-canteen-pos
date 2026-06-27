import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

function BottomNav() {
  const menu = [
    {
      name: "Halaman Utama",
      path: "/",
      icon: HomeIcon,
    },
    {
      name: "Pesanan",
      path: "/order",
      icon: ClipboardDocumentListIcon,
    },
    {
      name: "Admin",
      path: "/admin",
      icon: Cog6ToothIcon,
    },
  ];

  return (
    <div
      className="
        fixed
        bottom-0
        left-1/2
        z-50
        w-full
        max-w-[420px]
        -translate-x-1/2
        border-t
        border-slate-200
        bg-white
        shadow-lg
      "
    >
      <div className="grid grid-cols-3">

        {menu.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                flex-col
                items-center
                gap-1
                py-3
                transition
                ${
                  isActive
                    ? "text-indigo-600"
                    : "text-slate-500"
                }
                `
              }
            >
              <Icon className="h-6 w-6" />

              <span className="text-xs font-semibold">
                {item.name}
              </span>

            </NavLink>
          );
        })}

      </div>
    </div>
  );
}

export default BottomNav;