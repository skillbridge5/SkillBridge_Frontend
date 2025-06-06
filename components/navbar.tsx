"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, ChevronUp, Menu, X, Globe } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
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

  //? For Mobile Menu
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDropdown = (path: string) => {
    setOpenStates((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const closeMobileMenu = () => setMobileOpen(false);
  return (
    <>
      <header className='sticky top-0 z-40 bg-white/50 backdrop-blur-xl dark:bg-gray-950/50'>
        <section className='container mx-auto  px-2 xl:px-4 py-1 flex items-center justify-around lg:gap-4 xl:gap-32 '>
          <div className='flex items-center justify-between gap-4 sm:gap-6 md:gap-4 lg:gap-2 xl:gap-32 2xl:gap-10'>
            <div className='container spacing flex justify-between items-center gap-4 sm:gap-6 md:gap-8 lg:gap-2 xl:gap-32 2xl:gap-10 '>
              <div className='flex  gap-2 md:gap-4 lg:gap-8 '>
                <Link
                  href='/'
                  className='logo_width flex items-center mt-2 max-[375px]:mr-0 xs:mr-8 sm:mr-2 xl:mr-0 2xl:mr-4'
                >
                  <img
                    src='/Logo.svg'
                    alt='Skill Bridge Logo'
                    className='logo_width w-16 sm:w-20 md:w-24 lg:w-16 xl:w-20 h-16 sm:h-20 md:h-24 lg:h-16 xl:h-20 2xl:w-24 2xl:h-24'
                  />
                </Link>
                <nav className='hidden lg:flex items-center gap-4 lg:gap-5 xl:gap-6 2xl:gap-10 font-inter'>
                  {navbarItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.path}
                      className={`font-medium font-inter text-sm lg:text-xs xl:text-sm 2xl:text-[16px] ${
                        isActive(item.path)
                          ? "text-[#2196F3]"
                          : "text-gray-700 dark:text-gray-300 hover:text-[#2196F3]"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className='flex max-[375px]:gap-2 min-[375px]:gap-5 sm:gap-6 md:gap-6 lg:gap-8 2xl:gap-12 items-center'>
                <div className='search_bar flex items-center border border-gray-200 dark:border-gray-700 rounded-full pl-4 pr-2 py-0.5 sm:py-1.5 lg:py-1 xl:py-1.5 2xl:py-2 2xl:pl-8 2xl:pr-3 w-[220px] min-[500px]:w-[260px] sm:w-[280px] md:w-[240px] lg:w-[180px] xl:w-[280px] 2xl:w-[320px] max-[375px]:mr-1 min-[375px]:mr-4 min-[500px]:mr-7 sm:mr-4 md:mr-20 min-[920px]:!mr-8 lg:mr-4 xl:mr-1'>
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

                <Button
                  size='sm'
                  className='hidden md:block bg-[#2196F3] hover:bg-blue-500 h-9 px-5'
                >
                  Get Started
                </Button>
                <div className='flex gap-2'>
                  <label htmlFor='lang'>
                    <Globe className=' h-5 w-5 text-gray-700 dark:text-gray-300 hover:text-[#2196F3] cursor-pointer' />
                  </label>
                  <select
                    name='lang'
                    id='lang'
                    //remove the down arrow from the select element
                    className=' appearance-none bg-transparent text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:border-transparent'
                  >
                    <option value='english'>En</option>
                    <option value='hindi'>हिंदी</option>
                    <option value='spanish'>Es</option>
                    <option value='french'>Fr</option>
                    <option value='german'>De</option>
                    <option value='chinese'>Zh</option>
                    <option value='japanese'>Ja</option>
                  </select>
                </div>
                <div className='hidden md:block'>
                  <ThemeToggle />
                </div>
                <button
                  className='lg:hidden rounded-md py-2 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800'
                  onClick={() => setIsOpen(true)}
                >
                  <Menu className='h-5 md:h-6 w-5 md:w-6' />
                </button>
              </div>
            </div>
          </div>
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
                width={36}
                height={36}
              />
              <span className='font-bold text-sm sm:text-base'>
                SkillBridge
              </span>
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
              <div className='block md:hidden'>
                <ThemeToggle />
              </div>
              <Button
                size='sm'
                className='block md:hidden bg-[#2196F3] hover:bg-blue-500 h-9 px-5'
              >
                Get Started
              </Button>
            </div>

            <nav className='space-y-4'>
              {navbarItems.map((item) => (
                <div
                  key={item.path}
                  className='border-b border-gray-100 dark:border-gray-800'
                >
                  {
                    <Link
                      href={item.path}
                      className={`block py-2 font-medium font-inter ${
                        isActive(item.path)
                          ? "text-[#2196F3]"
                          : "text-gray-700 dark:text-gray-300 hover:text-[#2196F3]"
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </Link>
                  }
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
