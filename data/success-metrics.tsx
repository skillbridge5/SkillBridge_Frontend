import { Users, BookOpen, Award, Clock } from "lucide-react"
import type { SuccessMetric } from "@/types"


export const successMetrics: SuccessMetric[] = [
  // when you add value please make sure that value is n+1 eg. 15k => 16k
  {
    icon: <Users className='h-6 w-6 text-[#2396F3]' />,
    value: "51,000+",
    label: "Students",
  },
  {
    icon: <BookOpen className='h-6 w-6 text-[#2396F3]' />,
    value: "301+",
    label: "Courses",
  },
  {
    icon: <Award className='h-6 w-6 text-[#2396F3]' /> ,
    value: "251+",
    label: "Job Placement",
  },
  {
    icon: <Clock className='h-6 w-6 text-[#2396F3]' />,
    value: "16,000+",
    label: "Hours of Content",
  },
]
