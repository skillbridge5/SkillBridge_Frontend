"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Search, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { courses } from "@/lib/course-data"
import { Navbar } from '../../components/navbar';



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
]

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")

  // Filter courses based on active category and search query
  const filteredCourses = courses.filter((course) => {
    const matchesCategory = activeCategory === "All" || course.category === activeCategory
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Sort courses based on selected option
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "popular") return b.reviews - a.reviews
    if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()

    return 0
  })

  return (
    <>
    <Navbar />
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Explore Our Courses</h1>
        <p className="text-gray-600 max-w-3xl">
          Browse our comprehensive collection of courses designed to help you master new skills, advance your career,
          and achieve your learning goals.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-2/3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search for courses..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        
        <div className="w-full md:w-1/3 flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>

            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="All" className="mb-8">
        <TabsList className="flex flex-wrap h-auto mb-4">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} onClick={() => setActiveCategory(category)} className="mb-2">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            {sortedCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge className="bg-blue-500 text-white" variant="outline">{course.category}</Badge>
                        <div className="flex items-center text-sm">
                          <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{course.rating}</span>
                          <span className="ml-1 text-gray-500">({course.reviews})</span>
                        </div>
                      </div>
                      <h3 className="line-clamp-2 font-bold leading-tight mb-1">
                        <Link href={`/courses/${course.slug}`} className="hover:text-blue-500">
                          {course.title}
                        </Link>
                      </h3>
                      <p className="line-clamp-2 text-sm text-gray-500 mb-2">{course.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>Instructor: {course.instructor}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span>Duration: {course.duration}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between p-4 pt-0">
                      <div className="flex items-baseline gap-2">

                      </div>
                      <Button asChild size="sm">
                        <Link href={`/courses/${course.slug}`}>View Course</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No courses found. Try adjusting your search criteria.</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
    </>
  )
}
