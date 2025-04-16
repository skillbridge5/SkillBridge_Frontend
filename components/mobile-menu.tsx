"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import "./styles/style.css";
import { navbarItems } from "@/data/navbarItems";
import { usePathname } from "next/navigation";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path || (path !== '/' && pathname.startsWith(path));
  };

  const toggleDropdown = (path: string) => {
    setOpenStates(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <div className='lg:hidden'>
      <button
        className='lg:hidden rounded-md py-2 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800'
        onClick={() => setIsOpen(true)}
      >
        <Menu className='h-5 md:h-6 w-5 md:w-6' />
      </button>

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
              className='mobile_signup bg-[#2196F3] hover:bg-blue-600'
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
                            item.items?.some((subItem) => isActive(subItem.path))
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
  );
}
