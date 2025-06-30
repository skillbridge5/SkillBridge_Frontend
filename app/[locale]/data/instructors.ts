import type { Instructor } from "@/types"
import { imagePaths } from "./image-paths"

export const instructors: Instructor[] = [
  {
    id: "tafara-makaza",
    name: "Tafara Makaza",
    title: "Product & Systems Analyst",
    description: "Former UI Designer at Apple, Cofounder at AAA",
    image: imagePaths.instructors.tafaraMakaza,
    socialLinks: {
      twitter: "https://twitter.com/tafaramakaza",
      linkedin: "https://linkedin.com/in/tafaramakaza",
    },
  },
  {
    id: "ange-mannah",
    name: "Dr. Ange Mannah",
    title: "Data Science Specialist",
    description: "Lead CI Analyst at Data Space, Analytics and Planning",
    image: imagePaths.instructors.angeMannah,
    socialLinks: {
      twitter: "https://twitter.com/angemannah",
      linkedin: "https://linkedin.com/in/angemannah",
    },
  },
  {
    id: "eke-agulu",
    name: "Eke Agulu",
    title: "Career Educator & Author",
    description: "Former PM for Lambda School",
    image: imagePaths.instructors.ekeAgulu,
    socialLinks: {
      twitter: "https://twitter.com/ekeagulu",
      linkedin: "https://linkedin.com/in/ekeagulu",
    },
  },
  {
    id: "mike-mahlangu",
    name: "Mike Mahlangu",
    title: "Cloud & Information Program & Operations Manager",
    description: "Former Specialist for ISTG",
    image: imagePaths.instructors.mikeMahlangu,
    socialLinks: {
      twitter: "https://twitter.com/mikemahlangu",
      linkedin: "https://linkedin.com/in/mikemahlangu",
    },
  },
]
