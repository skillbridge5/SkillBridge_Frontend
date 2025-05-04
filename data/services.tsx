import { BookOpen, Monitor, Briefcase } from "lucide-react";
import type { Service } from "@/types";

export const servicesData: Service[] = [
  {
    icon: <BookOpen className='h-6 w-6 text-[#2396F3]' />,
    title: "Courses",
    description: "Lessons on design that cover the most recent developments.",
  },
  {
    icon: <Monitor className='h-6 w-6 text-[#2396F3]' />,
    title: "Training",
    description:
      "Classes in development that cover the most recent advancements in web.",
  },
  {
    icon: <Briefcase className='h-6 w-6 text-[#2396F3]' />,
    title: "Job-related Opportunities",
    description:
      "Successful data analysts have a unique set of skills and represent.",
  },
];
