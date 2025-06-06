import type React from "react"
import { ReactElement } from "react";
export interface Service {
  icon: ReactElement<{ className?: string }>;
  title: string
  description: string
}

export interface Course {
  id: string
  image: string
  category: string
  title: string
  description: string
  instructor: {
    name: string
    avatar: string
  }
  rating: number
  reviews: number
  link: string
  price: number
  duration: string
  enrollmentYear: number
}

export interface Instructor {
  id: string
  name: string
  title: string
  description: string
  image: string
  socialLinks?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

export interface Testimonial {
  id: string
  name: string
  title: string
  testimonial: string
  image: string
  bgColor?: string
}

export interface SuccessMetric {
  value: string
  label: string
  color: string
}

export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}
