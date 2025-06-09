"use client";
import { testimonials } from "@/data/testimonials";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote } from "lucide-react";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { imagePaths } from "../data/image-paths";
import { SectionHeading } from "./ui/section-heading";

export function TestimonialsSection() {
  return (
    <>
      <section className='py-24 px-12 bg-[#F6F6F6] dark:bg-gray-900/60'>
        <div className='container'>
          <SectionHeading title='Testimonials' subtitle='' center={true} />
          <div className='mx-auto flex  px-8'>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className='w-full '
            >
              <CarouselContent className='flex mb-6 '>
                {testimonials.map((testimonial) => (
                  <CarouselItem
                    key={testimonial.id}
                    className='md:basis-1/2 lg:basis-1/3 '
                  >
                    {/* when i hover in this div container change the color of quote icon */}
                    <div
                      className={`bg-transparent hover:scale-105 h-full transition-all duration-300 group
                    
                      `}
                    >
                      <div className='py-6 px-2 '>
                        <div className='flex flex-col items-center text-center'>
                          <div className='flex flex-col justify-center items-center bg-white group-hover:bg-[#2196f3] transition-colors duration-300 dark:bg-gray-900/40 dark:group-hover:bg-gray-800 pt-4 pb-12 px-6 gap-4 shadow-sm'>
                            <BiSolidQuoteAltLeft className='h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:w-16 lg:h-16 2xl:w-20 2xl:h-20 text-[#E5E8EA]' />
                            <p className='text-[#646464] group-hover:text-white dark:text-gray-300 italic relative z-10 font-montserrat'>
                              {testimonial.testimonial}
                            </p>
                          </div>
                          <Avatar className='w-10 h-10 md:w-14 md:h-14 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 -mt-8 mb-4'>
                            <AvatarImage
                              src={
                                testimonial.image ||
                                imagePaths.placeholders.avatar
                              }
                              alt={testimonial.name}
                            />
                            <AvatarFallback>
                              {testimonial.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className='font-bold text-base lg:text-lg 2xl:text-xl mb-1 text-[#646464] group-hover:text-[#2396F3]'>
                            {testimonial.name}
                          </h3>
                          <p className='text-[#646464] dark:text-gray-400 text-xs lg:text-sm mb-4'>
                            {testimonial.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className='flex justify-center mt-4'>
                <CarouselPrevious className='relative static left-0 right-auto translate-y-0 mr-2' />
                <CarouselNext className='relative static right-0 left-auto translate-y-0' />
              </div>
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
}
