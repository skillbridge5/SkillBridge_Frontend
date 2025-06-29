import type { Course } from "@/types"
import { imagePaths } from "./image-paths"

export const courses: Course[] = [
  {
    id: "figma-ui-ux",
    image: imagePaths.courses.design,
    category: "Design",
    title: "Figma UI UX Design",
    description: "Essential for app & website design. Learn to create stunning user interfaces.",
    instructor: {
      name: "Sarah Parker",
      avatar: imagePaths.instructors.instructor1,
    },
    rating: 4.8,
    reviews: 5420,
    link: "/courses/figma-ui-ux-design",
    price: 9.99,
    duration: "06 hr 3 mins",
    enrollmentYear: 2025,
  },
  {
    id: "web-development", 
    image: imagePaths.courses.webDevelopment,
    category: "Coding",
    title: "Web Development",
    description: "Learn to create responsive Apps that work across all devices and screens.",
    instructor: {
      name: "David Graham",
      avatar: imagePaths.instructors.instructor2,
    },
    rating: 4.9,
    reviews: 3651,
    link: "/courses/web-development",
    price: 12.99,
    duration: "06 hr 3 mins",
    enrollmentYear: 2025,
  },
  {
    id: "machine-learning",
    image: imagePaths.courses.machineLearning,
    category: "AI",
    title: "Machine Learning",
    description: "Build AI that automatically recognizes patterns and makes intelligent computers.",
    instructor: {
      name: "Sara Morris",
      avatar: imagePaths.instructors.instructor3,
    },
    rating: 4.7,
    reviews: 1921,
    link: "/courses/machine-learning",
    price: 11.70,
    duration: "06 hr 3 mins",
    enrollmentYear: 2025,
  },
]
