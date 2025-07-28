"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Clock,
  Award,
  Users,
  BookOpen,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { courseDetailsConfig } from "@/lib/course-details-config";
import { Navbar } from "../../components/navbar";

export default function CourseDetailPage() {
  const t = useTranslations();
  const params = useParams();
  const slug = params.slug as string;
  const courses = t.raw("courses") as any[];
  const courseMessages = t.raw("courseMessages") as any;

  const course = courses.find((c) => c.slug === slug);
  const courseWithImages = course
    ? {
        ...course,
        ...courseDetailsConfig[slug],
        image: courseDetailsConfig[slug]?.image || "/default-course.jpg",
        instructorImage:
          courseDetailsConfig[slug]?.instructorImage ||
          "/default-instructor.jpg",
      }
    : null;

  if (!courseWithImages) {
    return (
      <div className='container mx-auto px-4 py-12 text-center'>
        <h1 className='text-3xl font-bold mb-4'>{courseMessages.notFound}</h1>
        <p className='text-gray-600 mb-8'>{courseMessages.message}</p>
        <Button asChild>
          <Link href='/courses'>{courseMessages.browse}</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className='container mx-auto px-4 py-12'>
        <Link
          href='/courses'
          className='flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors mb-6 w-fit'
        >
          <ArrowLeft className='w-5 h-5 mr-2' />
          <span className='font-medium'>{courseMessages.back}</span>
        </Link>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2'>
            <div className='mb-8'>
              <div className='flex flex-wrap gap-2 mb-4'>
                <Badge className='bg-blue-500'>{course.category}</Badge>
                <Badge variant='outline'>{course.level}</Badge>
                <div className='flex items-center ml-auto'>
                  <Star className='h-4 w-4 fill-yellow-400 text-yellow-400 mr-1' />
                  <span className='font-medium'>{course.rating}</span>
                  <span className='text-gray-500 ml-1'>
                    ({course.reviews} {courseMessages.reviews})
                  </span>
                </div>
              </div>

              <h1 className='text-2xl sm:text-3xl font-bold mb-4'>
                {course.title}
              </h1>

              <p className='text-gray-600 mb-6'>{course.description}</p>

              <div className='flex flex-wrap gap-6 mb-6'>
                <div className='flex items-center gap-2'>
                  <Clock className='h-5 w-5 text-blue-500' />
                  <span>{course.duration}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <BookOpen className='h-5 w-5 text-blue-500' />
                  <span>
                    {course.lessons} {courseMessages.lessons}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Users className='h-5 w-5 text-blue-500' />
                  <span>
                    {course.students} {courseMessages.students}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Award className='h-5 w-5 text-blue-500' />
                  <span>{courseMessages.award}</span>
                </div>
              </div>

              <div className='relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden mb-8'>
                <Image
                  src={courseWithImages.image}
                  alt={courseWithImages.title}
                  width={800}
                  height={400}
                  className='w-full h-[300px] md:h-[400px] 2xl:h-[500px] object-cover'
                  priority
                />
              </div>
            </div>

            <Tabs defaultValue='about' className='mb-12'>
              <TabsList className='grid w-full grid-cols-3 gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg'>
                <TabsTrigger
                  value='about'
                  className='data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary dark:data-[state=active]:bg-gray-700 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                >
                  {courseMessages.tabLists.about}
                </TabsTrigger>
                <TabsTrigger
                  value='curriculum'
                  className='data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary dark:data-[state=active]:bg-gray-700 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                >
                  {courseMessages.tabLists.curriculum}
                </TabsTrigger>
                <TabsTrigger
                  value='instructor'
                  className='data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary dark:data-[state=active]:bg-gray-700 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                >
                  {courseMessages.tabLists.instructor}
                </TabsTrigger>
              </TabsList>

              <TabsContent value='about' className='pt-6 animate-fadeIn'>
                <div className='space-y-8'>
                  <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-all hover:shadow-md'>
                    <h3 className='text-xl font-bold mb-4 text-gray-800 dark:text-white'>
                      {courseMessages.tabContent.aboutCourse}
                    </h3>
                    <p className='text-gray-600 dark:text-gray-300 mb-4 leading-relaxed'>
                      {course.longDescription || course.description}
                    </p>
                  </div>

                  <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-all hover:shadow-md'>
                    <h3 className='text-xl font-bold mb-4 text-gray-800 dark:text-white'>
                      {courseMessages.tabContent.learn}
                    </h3>
                    <ul className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                      {course.learningOutcomes?.map(
                        (outcome: string, index: number) => (
                          <li
                            key={index}
                            className='flex items-start gap-2 p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150'
                          >
                            <CheckCircle className='h-5 w-5 text-green-500 shrink-0 mt-0.5' />
                            <span className='text-gray-700 dark:text-gray-300'>
                              {outcome}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-all hover:shadow-md'>
                    <h3 className='text-xl font-bold mb-4 text-gray-800 dark:text-white'>
                      {courseMessages.tabContent.prerequisites}
                    </h3>
                    <ul className='space-y-2'>
                      {course.prerequisites?.map(
                        (prerequisite: string, index: number) => (
                          <li
                            key={index}
                            className='flex items-start gap-2 p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150'
                          >
                            <AlertCircle className='h-5 w-5 text-blue-500 shrink-0 mt-0.5' />
                            <span className='text-gray-700 dark:text-gray-300'>
                              {prerequisite}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value='curriculum' className='pt-6 animate-fadeIn'>
                <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-all hover:shadow-md'>
                  <h3 className='text-xl font-bold mb-6 text-gray-800 dark:text-white'>
                    {courseMessages.tabContent.courseCur}
                  </h3>
                  <Accordion
                    type='single'
                    collapsible
                    className='w-full space-y-2'
                  >
                    {course.curriculum?.map((module: any, index: number) => (
                      <AccordionItem
                        key={index}
                        value={`module-${index}`}
                        className='border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all hover:shadow-md'
                      >
                        <AccordionTrigger className='hover:no-underline px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'>
                          <div className='flex items-center justify-between w-full text-left'>
                            <span className='font-medium text-gray-800 dark:text-white'>
                              Module {index + 1}: {module.title}
                            </span>
                            <span className='text-sm text-gray-500 dark:text-gray-400'>
                              {module.duration}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className='px-4 py-3 bg-white dark:bg-gray-800'>
                          <ul className='space-y-2 pt-2'>
                            {module.lessons?.map(
                              (lesson: any, lessonIndex: number) => (
                                  <li
                                    key={lessonIndex}
                                    className='flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150'
                                  >
                                    <div className='flex items-center gap-3'>
                                      <span className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                                        {index + 1}.{lessonIndex + 1}
                                      </span>
                                      <span className='text-gray-700 dark:text-gray-300'>
                                        {lesson.title}
                                      </span>
                                    </div>
                                    {/* {lesson.duration && ( */}
                                      <span className='text-sm text-gray-500 dark:text-gray-400'>
                                        {lesson.duration}
                                      </span>
                                    {/* )} */}
                                  </li>
                              )
                            )}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>

              <TabsContent value='instructor' className='pt-6 animate-fadeIn'>
                <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-all hover:shadow-md'>
                  <div className='flex flex-col md:flex-row gap-6'>
                    <div className='relative h-32 w-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow'>
                      <Image
                        src={courseWithImages.instructorImage}
                        alt={courseWithImages.instructor}
                        fill
                        sizes='(max-width: 200px) 100vw, 200px'
                        className='object-cover hover:scale-105 transition-transform duration-300'
                      />
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-xl font-bold mb-2 text-gray-800 dark:text-white'>
                        {course.instructor}
                      </h3>
                      <p className='text-gray-500 dark:text-gray-400 mb-4'>
                        {course.instructorTitle ||
                          courseMessages.tabLists.instructor}
                      </p>
                      <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                        {course.instructorBio ||
                          `${course.instructor} is an experienced instructor with expertise in ${course.category}. They have helped thousands of students master the skills needed to succeed in this field.`}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className='lg:col-span-1'>
            <div className='sticky top-24'>
              <div className='border rounded-lg overflow-hidden shadow-sm'>
                <div className='p-6'>
                  <div className='flex items-baseline gap-2 mb-4'>
                    <span className='text-3xl font-bold'>
                      ${course.discount > 0 ? course.discount : course.price}
                    </span>

                    {course.discount > 0 ? (
                      <span className='text-lg text-gray-500 line-through'>
                        ${course.price}
                      </span>
                    ) : null}
                    <Badge className='ml-auto bg-green-500'>
                      {course.discount > 0
                        ? Math.round(
                            ((course.price - course.discount) / course.price) *
                              100
                          )
                        : 0}
                      % off
                    </Badge>
                  </div>

                  <div className='space-y-4 mb-6'>
                    <h3 className='font-bold'>
                      {courseMessages.tabContent.payOpt}
                    </h3>
                    <RadioGroup defaultValue='one-time'>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='one-time' id='one-time' />
                        <Label htmlFor='one-time'>
                          {courseMessages.tabContent.otp} ($
                          {course.discount > 0 ? course.discount : course.price}
                          )
                        </Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='monthly' id='monthly' />
                        <Label htmlFor='monthly'>
                          {courseMessages.tabContent.subscription} ($
                          {(() => {
                            // Extract number and unit from duration string (e.g., "12 week")
                            const match =
                              course.duration.match(/^(\d+)\s*(\w+)/);
                            if (!match) return "N/A";
                            const durationNum = parseInt(match[1], 10);
                            const durationUnit = match[2].toLowerCase();

                            // Calculate months if unit is week
                            let months = durationNum;
                            if (
                              durationUnit === "week" ||
                              durationUnit === "weeks"
                            ) {
                              months = Math.ceil(durationNum / 4);
                            }

                            const price =
                              course.discount > 0
                                ? course.discount
                                : course.price;
                            return Math.round(price / months);
                          })()}
                          {courseMessages.tabContent.perMonth}{" "}
                          {(() => {
                            const match =
                              course.duration.match(/^(\d+)\s*(\w+)/);
                            if (!match) return course.duration;
                            return `${match[1]} ${match[2]}`;
                          })()}
                          )
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Button asChild className='w-full mb-4' size='lg'>
                    <Link href={`/courses/${slug}/ApplicationForm`}>
                      {courseMessages.tabContent.enroll}
                    </Link>
                  </Button>

                  <div className='text-sm text-gray-500 space-y-3'>
                    <div className='flex items-center gap-2'>
                      <Clock className='h-4 w-4' />
                      <span>{courseMessages.tabContent.lifeTime}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Users className='h-4 w-4' />
                      <span>{courseMessages.tabContent.access}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Award className='h-4 w-4' />
                      <span>{courseMessages.award}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
