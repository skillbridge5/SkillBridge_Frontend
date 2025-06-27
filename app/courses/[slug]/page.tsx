"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Star,
  Clock,
  Award,
  Users,
  BookOpen,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { courses } from "@/lib/course-data";
import EnrollmentForm from "@/components/enrollment-form";

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  //const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);

  // Find the course by slug
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className='container mx-auto px-4 py-12 text-center'>
        <h1 className='text-3xl font-bold mb-4'>Course Not Found</h1>
        <p className='text-gray-600 mb-8'>
          The course you are looking for does not exist.
        </p>
        <Button asChild>
          <Link href='/courses'>Browse All Courses</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-12'>
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
                  ({course.reviews} reviews)
                </span>
              </div>
            </div>

            <h1 className='text-3xl font-bold mb-4'>{course.title}</h1>

            <p className='text-gray-600 mb-6'>{course.description}</p>

            <div className='flex flex-wrap gap-6 mb-6'>
              <div className='flex items-center gap-2'>
                <Clock className='h-5 w-5 text-blue-500' />
                <span>{course.duration}</span>
              </div>
              <div className='flex items-center gap-2'>
                <BookOpen className='h-5 w-5 text-blue-500' />
                <span>{course.lessons} lessons</span>
              </div>
              <div className='flex items-center gap-2'>
                <Users className='h-5 w-5 text-blue-500' />
                <span>{course.students} students</span>
              </div>
              <div className='flex items-center gap-2'>
                <Award className='h-5 w-5 text-blue-500' />
                <span>Certificate of completion</span>
              </div>
            </div>

            <div className='relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden mb-8'>
              <img
                src={course.image}
                alt={course.title}
                className='w-full h-[300px] md:h-[400px] 2xl:h-[500px] object-cover'
              />
            </div>
          </div>

          <Tabs defaultValue='about' className='mb-8'>
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger value='about'>About</TabsTrigger>
              <TabsTrigger value='curriculum'>Curriculum</TabsTrigger>
              <TabsTrigger value='instructor'>Instructor</TabsTrigger>
            </TabsList>

            <TabsContent value='about' className='pt-6'>
              <div className='space-y-6'>
                <div>
                  <h3 className='text-xl font-bold mb-4'>About This Course</h3>
                  <p className='text-gray-600 mb-4'>
                    {course.longDescription || course.description}
                  </p>
                </div>

                <div>
                  <h3 className='text-xl font-bold mb-4'>
                    What You Will Learn
                  </h3>
                  <ul className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    {course.learningOutcomes?.map((outcome, index) => (
                      <li key={index} className='flex items-start gap-2'>
                        <CheckCircle className='h-5 w-5 text-green-500 shrink-0 mt-0.5' />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className='text-xl font-bold mb-4'>Prerequisites</h3>
                  <ul className='space-y-2'>
                    {course.prerequisites?.map((prerequisite, index) => (
                      <li key={index} className='flex items-start gap-2'>
                        <AlertCircle className='h-5 w-5 text-blue-500 shrink-0 mt-0.5' />
                        <span>{prerequisite}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value='curriculum' className='pt-6'>
              <h3 className='text-xl font-bold mb-4'>Course Curriculum</h3>
              <Accordion type='single' collapsible className='w-full'>
                {course.curriculum?.map((module, index) => (
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
                        {module.lessons.map((lesson, lessonIndex) => (
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
                        ))}
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
                    src={
                      course.instructorImage ||
                      "/placeholder.svg?height=200&width=200"
                    }
                    alt={course.instructor}
                    fill
                    className='object-cover'
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='text-xl font-bold mb-2'>
                    {course.instructor}
                  </h3>
                  <p className='text-gray-500 mb-4'>
                    {course.instructorTitle || "Course Instructor"}
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
                  <h3 className='font-bold'>Payment Options</h3>
                  <RadioGroup defaultValue='one-time'>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='one-time' id='one-time' />
                      <Label htmlFor='one-time'>
                        One-time payment (${course.discount})
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='monthly' id='monthly' />
                      <Label htmlFor='monthly'>
                        Monthly subscription (${Math.round(course.discount / 3)}
                        /month for 3 months)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                 {/*<Button
                  className='w-full mb-4'
                  size='lg'
                  onClick={() => setIsEnrollDialogOpen(true)}
                >
                  Enroll Now
                </Button> */}
                <Button asChild className="w-full mb-4" size="lg">
                  <Link href={`/courses/${slug}/ApplicationForm`}>
                     Enroll Now
                  </Link>
                </Button>


                <div className='text-sm text-gray-500 space-y-3'>
                  <div className='flex items-center gap-2'>
                    <Clock className='h-4 w-4' />
                    <span>Full lifetime access</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Users className='h-4 w-4' />
                    <span>Access on mobile and desktop</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Award className='h-4 w-4' />
                    <span>Certificate of completion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 {/*
      <Dialog open={isEnrollDialogOpen} onOpenChange={setIsEnrollDialogOpen}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Enroll in {course.title}</DialogTitle>

            <div className='mt-6 p-4 bg-gray-50 rounded-md text-sm text-gray-700'>
              <p>
                <strong>Payment Info:</strong>
              </p>
              <p>
                The payment is via only the{" "}
                <strong>Commercial Bank of Ethiopia</strong>.
              </p>
              <p>
                <strong>Account Name:</strong> John Doe
              </p>
              <p>
                <strong>Account Number:</strong> 10000237653
              </p>
            </div>
            <DialogDescription>
              Complete the form below to enroll in this course.
            </DialogDescription>
          </DialogHeader>

          <EnrollmentForm
            courseName={course.title}
            onClose={() => setIsEnrollDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>  */}
    </div>
  );
}
