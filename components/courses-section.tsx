"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ChevronRight, Clock, Star } from "lucide-react";
import { courses } from "@/data/courses";
import { AnimatedCard } from "@/components/ui/animated-card";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CoursesSection() {
  const categories = ["All", "Design", "Coding", "AI", "Business"];

  return (
    <section className='py-16 dark:bg-gray-950'>
      <div className='container mx-auto px-4'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='text-4xl lg:text-5xl font-bold text-start mb-2 dark:text-white'
        >
          Top Course
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className='font-semibold text-center text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-12 mt-4 text-sm md:text-base lg:text-lg'
        >
          Join the learning movement our top class delivers
          <br />
          Real world value you can't miss!
        </motion.p>

        <Tabs defaultValue='All' className='w-full mb-8'>
          <TabsList className='mx-auto flex justify-center'>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className='px-4'>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className='mt-6'>
              <div className='grid md:grid-cols-3 gap-6 xl:gap-10'>
                {courses
                  .filter(
                    (course) =>
                      category === "All" || course.category === category
                  )
                  .map((course, index) => (
                    <AnimatedCard key={course.id} delay={0.1 * index}>
                      <Card className='flex overflow-hidden border-none shadow-md dark:bg-gray-800 transition-all duration-300 hover:shadow-xl'>
                        <CardHeader className='p-0'>
                          <div className='relative'>
                            <img
                              src={course.image}
                              alt={course.title}
                              className='w-full h-[240px] object-cover'
                            />
                            <div className='absolute top-4 right-4'>
                              <Badge
                                variant='outline'
                                className='bg-white text-gray-700 font-medium px-3 py-1 flex items-center gap-1 rounded-none'
                              >
                                <Clock className='h-4 w-4' />
                                <span>{course.duration}</span>
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className='pt-5 px-5'>
                          {/* Category */}
                          <p className='text-sky-500 font-medium text-xl mb-1'>
                            {course.category}
                          </p>

                          {/* Title with Arrow */}
                          <div className='flex justify-between items-start mb-2'>
                            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-50'>
                              {course.title}
                            </h2>
                            <ArrowUpRight className='h-5 w-5 text-gray-700 dark:text-gray-300' />
                          </div>

                          {/* Description */}
                          <p className='text-gray-600 mb-4 dark:text-gray-400'>
                            {course.description}
                          </p>

                          {/* Rating */}
                          <div className='flex items-center mb-5'>
                            <span className='text-lg font-semibold text-gray-800 mr-2 dark:text-gray-200'>
                              {course.rating}
                            </span>
                            <div className='flex mr-2'>
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-5 h-5 ${
                                      i < Math.floor(course.rating)
                                        ? "text-amber-400"
                                        : "text-gray-300"
                                    }`}
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                  >
                                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                  </svg>
                                ))}
                            </div>
                            <span className='text-gray-500'>
                              ({course.reviews})
                            </span>
                          </div>
                        </CardContent>

                        <CardFooter className='px-5  flex justify-between items-center'>
                          {/* Instructor Info */}
                          <div className='flex items-center'>
                            <img
                              src={course.instructor.avatar}
                              alt={course.instructor.name}
                              className='w-10 h-10 rounded-full object-cover mr-3'
                            />
                            <div>
                              <p className='font-medium text-gray-800 dark:text-gray-200'>
                                {course.instructor.name}
                              </p>
                              <p className='text-sm text-gray-500'>
                                {course.enrollmentYear} Enrolled
                              </p>
                            </div>
                          </div>

                          {/* Price */}
                          <span className='text-sky-500 font-bold text-2xl'>
                            {course.price}
                          </span>
                        </CardFooter>
                      </Card>
                    </AnimatedCard>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
