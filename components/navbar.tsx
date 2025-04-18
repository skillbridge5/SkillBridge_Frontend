"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
// import { MobileMenu } from "@/components/mobile-menu";
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
import { ExploreDropdown } from "./explore-dropdown";

export function Navbar() {
  const pathname = usePathname();
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  const isActive = (path: string) => {
    return pathname === path || (path !== "/" && pathname.startsWith(path));
  };

  //? For Mobile Menu
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDropdown = (path: string) => {
    setOpenStates((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const closeMobileMenu = () => setMobileOpen(false);
  return (
    <>
    
      <header className='sticky top-0 z-40 border-b border-gray-200 bg-white/50 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950/50'>
      <section className="container mx-auto  px-2 xl:px-4 py-1 flex items-center justify-center lg:gap-4 xl:gap-8 ">
        <div className='flex items-center justify-between gap-4 sm:gap-6 md:gap-4 lg:gap-2 xl:gap-8 2xl:gap-10'>
          <div className='spacing flex justify-evenly items-center gap-4 sm:gap-6 md:gap-8 lg:gap-2 xl:gap-8 2xl:gap-10 '>
            <Link href='/' className='logo_width flex items-center mt-2'>
              <img
                src='/Logo.svg'
                alt='Skill Bridge Logo'
                className='logo_width w-16 sm:w-20 md:w-24 lg:w-16 xl:w-24 h-16 sm:h-20 md:h-24 lg:h-16 xl:h-24'
              />
            </Link>

            <div className='explore relative hidden sm:block'>
              <ExploreDropdown />
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
            <div className='signed_up hidden relative items-center right-0 gap-3'>
              <div className='hidden md:block lg:hidden ml-0'>
                <ThemeToggle />
              </div>
              <Button
                size='sm'
                className='bg-[#2196F3] hover:bg-blue-500 h-9 px-5'
              >
                Sign Up
              </Button>
            </div>
            <button
              className='lg:hidden rounded-md py-2 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800'
              onClick={() => setIsOpen(true)}
            >
              <Menu className='h-5 md:h-6 w-5 md:w-6' />
            </button>
          </div>
        </div>

        <nav className='hidden lg:flex items-center gap-6 lg:gap-3 xl:gap-4 2xl:gap-10'>
          {navbarItems.map((item, index) =>
            item.type === "link" ? (
              <Link
                key={index}
                href={item.path}
                className={`font-medium text-sm lg:text-xs xl:text-sm 2xl:text-[16px] ${
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
                    className={`flex items-center gap-1 font-medium text-sm lg:text-xs xl:text-sm 2xl:text-[16px] ${
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
            <Button
              size='sm'
              className='bg-[#2196F3] hover:bg-blue-500 h-9 px-5'
            >
              Sign Up
            </Button>
          </div>
        </nav>
        </section>
      </header>
      {/* <MobileMenu /> */}

      {/* TODO Mobile Menu for smaller screens */}
      <div className='lg:hidden'>
        {/* Mobile menu overlay */}
        {isOpen && (
          <div
            className='fixed inset-0 bg-black/50 z-50'
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        {/* Mobile menu panel */}
        <div
          className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white dark:bg-gray-900 z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className='flex justify-between items-center p-4 border-b'>
            <div className='flex items-center gap-2'>
              <Image
                src='/skills.png'
                alt='Skill Bridge Mobile Logo'
                width={40}
                height={40}
              />
              <span className='font-bold'>SkillBridge</span>
            </div>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsOpen(false)}
              aria-label='Close menu'
            >
              <X className='h-5 w-5' />
            </Button>
          </div>

          <div className='p-4'>
            <div className='flex items-center justify-between mb-6'>
              <ThemeToggle />
              <Button
                size='sm'
                className='mobile_signup bg-[#2196F3] hover:bg-blue-500'
              >
                Sign Up
              </Button>
            </div>

            <nav className='space-y-4'>
              {navbarItems.map((item) => (
                <div
                  key={item.path}
                  className='border-b border-gray-100 dark:border-gray-800'
                >
                  {item.type === "link" ? (
                    <Link
                      href={item.path}
                      className={`block py-2 font-medium ${
                        isActive(item.path)
                          ? "text-[#2196F3]"
                          : "text-gray-700 dark:text-gray-300 hover:text-[#2196F3]"
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <div className='py-2'>
                      <div className='space-y-2'>
                        <div className='flex items-center justify-between'>
                          <span
                            className={`font-medium ${
                              isActive(item.path) ||
                              item.items?.some((subItem) =>
                                isActive(subItem.path)
                              )
                                ? "text-[#2196F3]"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {item.name}
                          </span>
                          <button
                            onClick={() => toggleDropdown(item.path)}
                            className='focus:outline-none'
                          >
                            {openStates[item.path] ? (
                              <ChevronUp className='h-4 w-4' />
                            ) : (
                              <ChevronDown className='h-4 w-4' />
                            )}
                          </button>
                        </div>
                        {openStates[item.path] && (
                          <div className='pl-4 space-y-2 border-l-2 border-gray-200 dark:border-gray-700'>
                            {item.items?.map((subItem) => (
                              <Link
                                href={subItem.path}
                                key={subItem.path}
                                className={`block py-1 transition-colors ${
                                  isActive(subItem.path)
                                    ? "text-[#2196F3]"
                                    : "text-gray-700 hover:text-[#2196F3] dark:text-gray-300 dark:hover:text-blue-400"
                                }`}
                                onClick={closeMobileMenu}
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className='mt-8'>
              <div className='relative'>
                <div className='mobile_explore flex  justify-center items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex items-center gap-2 h-9 dark:border-gray-700 dark:text-gray-300'
                  >
                    Explore
                    <ChevronDown size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}
