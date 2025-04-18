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
import { imagePaths } from "../data/image-paths";

export function TestimonialsSection() {
  return (
    <>
      <div className='mt-12 py-8'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='text-3xl md:text-5xl 2xl:text-5xl font-bold text-center mb-12 text-[#2396F3] tracking-wide'
        >
          Testimonials
        </motion.h2>
      </div>
      <section className='py-24 px-12 bg-[#EEF4FF] dark:bg-gray-950'>
        <div className='container'>
          <div className='mx-auto flex gap-8 px-8'>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className='w-full '
            >
              <CarouselContent className='flex md:gap-4 mb-6'>
                {testimonials.map((testimonial) => (
                  <CarouselItem
                    key={testimonial.id}
                    className='md:basis-1/2 lg:basis-1/3 p-1 '
                  >
                    <div className={`bg-transparent  h-full`}>
                      <div className='p-6 '>
                        <div className='flex flex-col items-center text-center '>
                          <Avatar className='w-20 h-20 md:w-28 md:h-28 xl:w-32 xl:h-32 mb-4'>
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
                          <h3 className='font-bold text-lg lg:text-xl 2xl:text-2xl mb-1 text-[#2396F3]'>
                            {testimonial.name}
                          </h3>
                          <p className='text-gray-600 dark:text-gray-400 text-sm lg:text-base mb-4'>
                            {testimonial.title}
                          </p>
                          <div className='relative'>
                            <Quote className='absolute -top-2 -left-2 w-6 h-6 text-blue-300 opacity-40' />
                            <p className='text-gray-700 dark:text-gray-300 italic relative z-10'>
                              "{testimonial.testimonial}"
                            </p>
                          </div>
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
