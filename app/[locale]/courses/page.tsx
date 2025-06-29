"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/[lang]/components/ui/card";
import { Button } from "@/app/[lang]/components/ui/button";
import { Badge } from "@/app/[lang]/components/ui/badge";
import { Input } from "@/app/[lang]/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/[lang]/components/ui/tabs";
import { Star, Search, Filter, ArrowUpRight, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/[lang]/components/ui/select";
import { courses } from "@/lib/course-data";
import { Navbar } from "../../[lang]/components/navbar";
import { AnimatedCard } from "@/app/[lang]/components/ui/animated-card";
import Footer from "@/app/[lang]/components/footer";

// Categories for filtering
const categories = [
  "All",
  "Development",
  "Business",
  "Design",
  "Marketing",
  "IT & Software",
  "Artificial Intelligence",
  "Data Science",
  "Blockchain",
];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  // Filter courses based on active category and search query
  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      activeCategory === "All" || course.category === activeCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort courses based on selected option
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "popular") return b.reviews - a.reviews;
    if (sortBy === "newest")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

    return 0;
  });

  return (
    <>
      <Navbar />
      <div className='container mx-auto px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-16 py-12 2xl:pb-20'>
        <div className=' mb-8'>
          <h1 className='text-3xl font-bold mb-4'>Explore Our Courses</h1>
          <p className='text-gray-600 max-w-3xl'>
            Browse our comprehensive collection of courses designed to help you
            master new skills, advance your career, and achieve your learning
            goals.
          </p>
        </div>

        <div className='flex flex-col md:flex-row gap-6 mb-8'>
          <div className='w-full md:w-2/3'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
              <Input
                type='search'
                placeholder='Search for courses...'
                className='pl-10'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className='w-full md:w-1/3 flex gap-2'>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder='Sort by' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='popular'>Most Popular</SelectItem>
                <SelectItem value='newest'>Newest</SelectItem>
              </SelectContent>
            </Select>

            <Button variant='outline' size='icon'>
              <Filter className='h-4 w-4' />
              <span className='sr-only'>Filter</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue='All' className='mb-8'>
          <TabsList className='flex flex-wrap h-auto mb-4'>
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setActiveCategory(category)}
                className='mb-2'
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className='mt-0'>
              {sortedCourses.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                  {sortedCourses.map((course, index) => (
                    <AnimatedCard key={course.id} delay={0.1 * index}>
                      <Card className='flex overflow-hidden border-none shadow-[2px_2px_15px_rgba(0,0,0,0.2)] dark:bg-gray-900/40 transition-all duration-300 hover:shadow-xl gap-2 h-full '>
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
                          <p className='text-gray-600 mb-4 dark:text-gray-400 text-sm md:text-base 2xl:text-lg'>
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
              ) : (
                <div className='text-center py-12'>
                  <p className='text-gray-500'>
                    No courses found. Try adjusting your search criteria.
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <Footer />
    </>
  );
}
