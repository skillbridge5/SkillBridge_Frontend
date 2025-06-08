"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { AnimatedCard } from "@/components/ui/animated-card";
import { SectionHeading } from "@/components/ui/section-heading";
import React from "react";
import { Service } from "@/types";

export interface ServicesGridProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesGridProps) {
  return (
    <section className='py-16 bg-[#FBFBFB] dark:bg-gray-900/40 '>
      <div className='container mx-auto px-4'>
        <SectionHeading
          title='Our Services'
          subtitle='Bridging skill gaps and fostering industry-ready talent.'
          center={true}
        />

        <div className='grid md:grid-cols-3 gap-6 md:gap-4 lg:gap-12 xl:gap-16 2xl:gap-24'>
          {services.map((service, index) => (
            <AnimatedCard key={index} delay={0.1 * index} className=''>
              <Card className='border-none shadow-md bg-white dark:bg-gray-900 dark:hover:bg-gray-800 h-full transition-all duration-300 hover:shadow-xl hover:bg-[#2196F3] group hover:scale-105 font-montserrat'>
                <CardContent className='px-6 py-5'>
                  <div className='w-12 h-12 rounded-lg bg-[#E0EAFF] flex items-center justify-center mb-4 group-hover:bg-white transition-colors duration-300'>
                    {service.icon &&
                      React.isValidElement(service.icon) &&
                      React.cloneElement(service.icon, {
                        className: "text-[#2196F3] group-hover:text-[#2396F3]",
                      })}
                  </div>
                  <h3 className='text-xl font-bold mb-2 dark:text-white group-hover:text-white'>
                    {service.title}
                  </h3>
                  <p className='text-xs max-[540px]:!text-sm md:!text-base text-gray-600 dark:text-gray-400 mb-4 group-hover:text-white'>
                    {service.description}
                  </p>
                  <Link
                    href='#'
                    className='text-blue-500 font-medium flex items-center gap-1 text-sm group-hover:text-white'
                  >
                    Learn More
                    <ChevronRight
                      size={16}
                      className='transition-transform duration-300 group-hover:translate-x-1'
                    />
                  </Link>
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
