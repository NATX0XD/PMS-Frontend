"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";

import clsx from "clsx";
import { Navigation } from "@/configurations/navigation/Navigation";
import { useSettings } from "@/hooks/useSettings";
import { usePathname } from "next/navigation";
import { IoMdMenu } from "react-icons/io";
import { BiMenuAltRight } from "react-icons/bi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Sidebar = ({ isMobile }) => {
  const [openMenus, setOpenMenus] = useState({});
  const { settings, saveSettings } = useSettings();
  const pathname = usePathname();
  const toggleSubMenu = (title) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };
  const handleCollapsed = () => {
    saveSettings({
      ...settings,
      navigationCollapse: !settings.navigationCollapse,
    });
  };
  const isCollapsed = settings.navigationCollapse;

  return (
    <aside
      className={clsx(
        "h-full bg-white dark:bg-background shadow-md transition-all duration-300",
        isMobile ? "w-full" : isCollapsed ? "min-w-[80px]" : "min-w-[250px]"
      )}
    >
      <div
        className={clsx(
          "flex items-center p-4 ",
          isCollapsed ? "justify-center" : "justify-between"
        )}
      >
        <span
          className={clsx(
            "text-xl font-bold bg-gradient-to-r transition-all duration-1000 from-[var(--primaryGradientStart)] via-[var(--primaryGradientMiddle)] to-[var(--primaryGradientEnd)] bg-clip-text text-transparent",
            {
              hidden: isCollapsed,
            }
          )}
        >
          {process.env.NEXT_PUBLIC_APP_NAME}
        </span>

        {!isMobile && (
          <Button
            isIconOnly
            size={"md"}
            variant="light"
            onPress={handleCollapsed}
            fullWidth
          >
            {isCollapsed ? (
              <IoMdMenu className="text-lg" />
            ) : (
              <BiMenuAltRight className="text-lg" />
            )}
          </Button>
        )}
      </div>

      <nav className="px-2 py-4 space-y-3">
        {Navigation.map((item) => {
          const isActive = pathname === item.url;
          return (
            <div key={item.title}>
              <Button
                as={Link}
                href={item.url}
                onPress={() => {
                  if (item.children) toggleSubMenu(item.title);
                }}
                fullWidth
                size={isCollapsed ? "sm" : "md"}
                variant={isActive ? "solid" : "light"}
                className={clsx(
                  "justify-start gap-3 px-3 py-2 text-left transition-colors ",
                  isCollapsed && "justify-center",
                  isActive &&
                    "bg-gradient-to-r from-[var(--primaryGradientStart)] via-[var(--primaryGradientMiddle)] to-[var(--primaryGradientEnd)] text-white"
                )}
                endContent={
                  item.children && !isCollapsed ? (
                    <div className="ml-auto">
                      {openMenus[item.title] ? (
                        <FaChevronUp size={14} />
                      ) : (
                        <FaChevronDown size={14} />
                      )}
                    </div>
                  ) : null
                }
              >
                <>
                  {item.icon}
                  {!isCollapsed && <span>{item.title}</span>}
                </>
              </Button>

              {/* Submenu */}
              {!isCollapsed &&
                item.children &&
                openMenus[item.title] &&
                item.children.map((child) => {
                  const isChildActive = pathname === child.url;
                  return (
                    <Link href={child.url} key={child.title} passHref>
                      <div
                        className={clsx(
                          "ml-6 flex items-center gap-2 px-3 py-1 text-sm m-2  rounded-md transition-colors",
                          isChildActive
                            ? "bg-zinc-200 dark:bg-zinc-700 font-medium text-black dark:text-white"
                            : "text-gray-600 dark:text-gray-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        )}
                      >
                        {/* {child.icon} */}
                        <span>{child.title}</span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};
export default Sidebar;
