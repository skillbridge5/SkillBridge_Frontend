"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/mobile-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import "./styles/style.css";
import { navbarItems } from "@/data/navbar-items";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  const isActive = (path: string) => {
    return pathname === path || (path !== "/" && pathname.startsWith(path));
  };
  return (
    <header className=' px-2 xl:px-4 py-4 flex items-center justify-center lg:gap-4 xl:gap-8 '>
      <div className='flex items-center justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-2 xl:gap-8 2xl:gap-10'>
        <div className='spacing flex justify-around items-center gap-4 sm:gap-6 md:gap-8 lg:gap-2 xl:gap-8 2xl:gap-10 '>
          <Link href='/' className='flex items-center mt-2'>
            <img
              src='/Logo.svg'
              alt='Skill Bridge Logo'
              className='w-16 sm:w-20 md:w-24 lg:w-16 xl:w-24 h-16 sm:h-20 md:h-24 lg:h-16 xl:h-24'
            />
          </Link>

          <div className='explore relative hidden sm:block'>
            <Button
              variant='outline'
              size='sm'
              className='flex items-center gap-2 h-9 dark:border-gray-700 dark:text-gray-300'
            >
              Explore
              <ChevronDown size={16} />
            </Button>
          </div>

          <div className=' relative flex justify-start items-center'>
            <div className='search_bar flex items-center border border-gray-200 dark:border-gray-700 rounded-full pl-4 pr-2 py-0.5 sm:py-1.5 lg:py-1 xl:py-1.5 2xl:py-2 2xl:pl-8 2xl:pr-3 w-[220px] sm:w-[280px] md:w-[240px] lg:w-[180px] xl:w-[280px] 2xl:w-[320px]'>
              <input
                type='text'
                placeholder='What do you want to learn?'
                className='bg-transparent outline-none text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-lg  w-full dark:text-white'
              />
              <Button
                size='icon'
                variant='ghost'
                className='h-7 w-7 rounded-full'
              >
                <Search size={16} className='text-[#2196F3]' />
              </Button>
            </div>
          </div>
        </div>
        <div className='signed_up hidden relative items-center right-0 '>
          <div className='hidden md:block lg:hidden px-8 '>
            <ThemeToggle />
          </div>
          <Button size='sm' className='bg-[#2196F3] hover:bg-blue-600 h-9 px-5'>
            Sign Up
          </Button>
        </div>
      </div>

      <nav className='hidden lg:flex items-center gap-6 lg:gap-3 xl:gap-6 2xl:gap-10'>
        {navbarItems.map((item, index) =>
          item.type === "link" ? (
            <Link
              key={index}
              href={item.path}
              className={`font-medium text-sm lg:text-xs xl:text-sm 2xl:text-lg ${
                isActive(item.path)
                  ? "text-[#2196F3]"
                  : "text-gray-700 dark:text-gray-300 hover:text-[#2196F3]"
              }`}
            >
              {item.name}
            </Link>
          ) : (
            <DropdownMenu
              key={index}
              onOpenChange={(open) =>
                setOpenStates((prev) => ({ ...prev, [item.path]: open }))
              }
            >
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1 font-medium text-sm lg:text-xs xl:text-sm 2xl:text-lg ${
                    isActive(item.path) ||
                    item.items?.some((subItem) => isActive(subItem.path))
                      ? "text-[#2196F3]"
                      : "text-gray-700 dark:text-gray-300 hover:text-[#2196F3]"
                  }`}
                >
                  {item.name}
                  {openStates[item.path] ? (
                    <ChevronUp className='h-4 w-4' />
                  ) : (
                    <ChevronDown className='h-4 w-4' />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start' className='w-48'>
                {item.items?.map((dropdownItem, idx) => (
                  <DropdownMenuItem key={idx}>
                    <Link
                      href={dropdownItem.path}
                      className={`w-full ${
                        isActive(dropdownItem.path) ? "text-[#2196F3]" : ""
                      }`}
                    >
                      {dropdownItem.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )
        )}

        <div className='flex items-center gap-4 2xl:gap-8 ml-4 lg:ml-0 xl:ml-6 2xl:ml-8'>
          <ThemeToggle />
          <Button size='sm' className='bg-[#2196F3] hover:bg-blue-600 h-9 px-5'>
            Sign Up
          </Button>
        </div>
      </nav>

      <MobileMenu />
    </header>
  );
}
