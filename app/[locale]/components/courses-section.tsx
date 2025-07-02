"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/app/[locale]/components/ui/card";
import { Badge } from "@/app/[locale]/components/ui/badge";
import { ArrowUpRight, Clock } from "lucide-react";
import { courses } from "@/lib/course-data";
import { AnimatedCard } from "@/app/[locale]/components/ui/animated-card";
import { SectionHeading } from "./ui/section-heading";
import Link from "next/link";

export function CoursesSection() {
  // Get top 3 courses by student enrollment
  const topCourses = [...courses]
    .sort((a, b) => b.students - a.students)
    .slice(0, 3);

  return (
    <section className='py-16 dark:bg-gray-950'>
      <div className=' mx-auto px-4'>
        <SectionHeading
          title='Top Courses'
          subtitle="Join thousands of students in our most popular courses. Real world value you can't miss!"
          center={true}
        />

        <div className='w-full mb-8'>
          <div className='grid min-[840px]:grid-cols-3 gap-8 xl:gap-12 2xl:gap-16 min-[1710px]:gap-20  lg:px-4 xl:px-8 2xl:px-12 '>
            {topCourses.map((course, index) => (
              <AnimatedCard key={course.id} delay={0.1 * index}>
                <Card className='flex overflow-hidden border-none shadow-[2px_2px_15px_rgba(0,0,0,0.3)] dark:bg-gray-900/40 transition-all duration-300 hover:shadow-xl gap-2 h-full '>
                  <CardHeader className='px-4'>
                    <div className='relative'>
                      <img
                        src={course.image}
                        alt={course.title}
                        className='w-full h-[200px] 2xl:h-[250px] object-cover rounded-sm'
                      />
                      <div className='absolute bottom-4 left-4'>
                        <Badge
                          variant='outline'
                          className='bg-gray-500/80 text-white font-medium px-3 py-1 flex items-center gap-1 rounded-[6px] border-none'
                        >
                          <Clock className='h-4 w-4' />
                          <span>{course.duration}</span>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className='px-4'>
                    {/* Category */}
                    <p className='text-sky-500 font-medium text-xs md:text-sm lg:text-base  2xl:text-lg mb-1'>
                      {course.category}
                    </p>

                    {/* Title with Arrow */}
                    <div className='flex justify-between items-start my-2'>
                      <h2 className='text-base sm:text-lg lg:text-xl  2xl:text-2xl font-bold text-gray-900 dark:text-gray-50'>
                        {course.title}
                      </h2>
                      <ArrowUpRight className='h-4 w-4 lg:h-5 lg:w-5 2xl:w-6 2xl:h-6 text-gray-700 dark:text-gray-300' />
                    </div>

                    {/* Description */}
                    <p className='text-gray-600 mb-4 dark:text-gray-400 text-sm md:text-base lg:text-lg 2xl:text-xl'>
                      {course.description}
                    </p>

                    {/* Rating */}
                    <div className='flex items-center mb-5'>
                      <span className='text-base md:text-lg font-semibold text-gray-800 mr-2 dark:text-gray-200'>
                        {course.rating}
                      </span>
                      <div className='flex mr-2'>
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 lg:h-5 lg:w-5 2xl:w-6 2xl:h-6 ${
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
                      <span className='text-gray-500 text-sm md:text-base '>
                        ({course.reviews})
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className='px-4 flex justify-between items-center'>
                    {/* Instructor Info */}
                    <div className='flex items-center'>
                      <img
                        src={course.instructorImage}
                        alt={course.instructor}
                        className='w-10 h-10 rounded-full object-cover mr-3'
                      />
                      <div>
                        <p className='font-medium text-gray-800 dark:text-gray-200'>
                          {course.instructor}
                        </p>
                        <p className='text-sm text-gray-500'>
                          {course.enrollmentYear} Enrolled
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <span className='text-sky-500 font-bold md:text-xl'>
                      <Link href={`/courses/${course.slug}`}>
                        View Details &gt;
                      </Link>
                    </span>
                  </CardFooter>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
