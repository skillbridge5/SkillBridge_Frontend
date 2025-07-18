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

          <Tabs defaultValue='about' className='mb-8'>
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger value='about'>
                {courseMessages.tabLists.about}
              </TabsTrigger>
              <TabsTrigger value='curriculum'>
                {courseMessages.tabLists.curriculum}
              </TabsTrigger>
              <TabsTrigger value='instructor'>
                {courseMessages.tabLists.instructor}
              </TabsTrigger>
            </TabsList>

            <TabsContent value='about' className='pt-6'>
              <div className='space-y-6'>
                <div>
                  <h3 className='text-xl font-bold mb-4'>
                    {courseMessages.tabContent.aboutCourse}
                  </h3>
                  <p className='text-gray-600 mb-4'>
                    {course.longDescription || course.description}
                  </p>
                </div>

                <div>
                  <h3 className='text-xl font-bold mb-4'>
                    {courseMessages.tabContent.learn}
                  </h3>
                  <ul className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    {course.learningOutcomes?.map(
                      (outcome: string, index: number) => (
                        <li key={index} className='flex items-start gap-2'>
                          <CheckCircle className='h-5 w-5 text-green-500 shrink-0 mt-0.5' />
                          <span>{outcome}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className='text-xl font-bold mb-4'>
                    {courseMessages.tabContent.prerequisites}
                  </h3>
                  <ul className='space-y-2'>
                    {course.prerequisites?.map(
                      (prerequisite: string, index: number) => (
                        <li key={index} className='flex items-start gap-2'>
                          <AlertCircle className='h-5 w-5 text-blue-500 shrink-0 mt-0.5' />
                          <span>{prerequisite}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value='curriculum' className='pt-6'>
              <h3 className='text-xl font-bold mb-4'>
                {courseMessages.tabContent.courseCur}
              </h3>
              <Accordion type='single' collapsible className='w-full'>
                {course.curriculum?.map((module: any, index: number) => (
                  <AccordionItem key={index} value={`module-${index}`}>
                    <AccordionTrigger className='hover:no-underline'>
                      <div className='flex items-center justify-between w-full text-left'>
                        <span className='font-medium'>
                          Module {index + 1}: {module.title}
                        </span>
                        <span className='text-sm text-gray-500'>
                          {module.duration}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className='space-y-2 pt-2'>
                        {module.lessons.map(
                          (lesson: any, lessonIndex: number) => (
                            <li
                              key={lessonIndex}
                              className='flex items-center justify-between py-2 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800'
                            >
                              <div className='flex items-center gap-2'>
                                <span className='text-sm font-medium'>
                                  {index + 1}.{lessonIndex + 1}
                                </span>
                                <span>{lesson.title}</span>
                              </div>
                              <span className='text-sm text-gray-500'>
                                {lesson.duration}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value='instructor' className='pt-6'>
              <div className='flex flex-col md:flex-row gap-6'>
                <div className='relative h-32 w-32 rounded-full overflow-hidden'>
  <Image
    src={courseWithImages.instructorImage}
    alt={courseWithImages.instructor}
    fill
    sizes='(max-width: 200px) 100vw, 200px'
    className='object-cover'
  />
</div>
                <div className='flex-1'>
                  <h3 className='text-xl font-bold mb-2'>
                    {course.instructor}
                  </h3>
                  <p className='text-gray-500 mb-4'>
                    {course.instructorTitle ||
                      courseMessages.tabLists.instructor}
                  </p>
                  <p className='text-gray-600'>
                    {course.instructorBio ||
                      `${course.instructor} is an experienced instructor with expertise in ${course.category}. They have helped thousands of students master the skills needed to succeed in this field.`}
                  </p>
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
                  <span className='text-3xl font-bold'>${course.discount}</span>
                  <span className='text-lg text-gray-500 line-through'>
                    ${course.price}
                  </span>
                  <Badge className='ml-auto bg-green-500'>
                    {Math.round((1 - course.discount / course.price) * 100)}%
                    off
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
                        {courseMessages.tabContent.otp} (${course.discount})
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='monthly' id='monthly' />
                      <Label htmlFor='monthly'>
                        {courseMessages.tabContent.subscription} ($
                        {Math.round(course.discount / 3)}
                        {courseMessages.tabContent.perMonth})
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
  );
}
