"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categoriesData } from "@/data/categories"


export function ExploreDropdown() {
  const [isExploreOpen, setIsExploreOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsExploreOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close dropdown when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Don't close the dropdown on mobile, just adjust its position
        // This ensures it remains usable on small screens
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const toggleExplore = () => {
    setIsExploreOpen(!isExploreOpen)
    if (!isExploreOpen) {
      setActiveCategory(null)
      setActiveSubcategory(null)
    }
  }

  const handleCategoryClick = (categoryName: string) => {
    if (activeCategory === categoryName) {
      // If clicking the same category, toggle it off
      setActiveCategory(null)
      setActiveSubcategory(null)
    } else {
      // Otherwise, set it as active
      setActiveCategory(categoryName)
      setActiveSubcategory(null)
    }
  }

  const handleSubcategoryClick = (subcategoryName: string) => {
    if (activeSubcategory === subcategoryName) {
      // If clicking the same subcategory, toggle it off
      setActiveSubcategory(null)
    } else {
      // Otherwise, set it as active
      setActiveSubcategory(subcategoryName)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        className="border-blue-300 text-blue-500 flex items-center gap-2 font-light h-9 px-3 text-sm sm:h-10 sm:px-4 sm:text-base"
        onClick={toggleExplore}
      >
        Explore {isExploreOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>

      {isExploreOpen && (
        <div className="absolute left-0 top-full mt-1 z-50">
          <div className="bg-white rounded-lg shadow-lg border overflow-hidden flex flex-col sm:flex-row max-w-[90vw] sm:max-w-[95vw] md:max-w-[900px]">
            {/* Left Column - Categories */}
            <div className="w-full sm:w-[250px] md:w-[300px] max-h-[60vh] sm:max-h-[80vh] overflow-y-auto">
              <div className="p-3 sm:p-4">
                <h3 className="font-light text-gray-700 text-sm sm:text-base">Browse Certifications</h3>
              </div>
              <div className="p-3 sm:p-4 border-b">
                <h3 className="font-light text-gray-700 text-sm sm:text-base">Certification preparation</h3>
              </div>
              {categoriesData.map((category, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 sm:p-4 hover:bg-gray-100 cursor-pointer transition-colors duration-150 ${
                    category.name === activeCategory ? "bg-gray-50" : ""
                  }`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <span
                    className={`${
                      category.name === activeCategory ? "text-blue-500" : "text-gray-700"
                    } font-light text-sm sm:text-base`}
                  >
                    {category.name}
                  </span>
                  {category.name === activeCategory ? (
                    <ChevronDown className="h-5 w-5 text-blue-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              ))}
            </div>

            {/* Middle Column - Subcategories (only shown when a category is active) */}
            {activeCategory && (
              <div className="w-full sm:w-[250px] md:w-[300px] max-h-[60vh] sm:max-h-[80vh] overflow-y-auto border-t sm:border-t-0 sm:border-l">
                {/* Back button for mobile */}
                <div
                  className="p-3 sm:hidden flex items-center text-blue-500 cursor-pointer"
                  onClick={() => setActiveCategory(null)}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  <span className="font-light text-sm">Back to Categories</span>
                </div>

                {categoriesData
                  .find((cat) => cat.name === activeCategory)
                  ?.subcategories.map((subcategory, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 sm:p-4 hover:bg-gray-100 cursor-pointer transition-colors duration-150 ${
                        subcategory.name === activeSubcategory ? "bg-gray-50" : ""
                      }`}
                      onClick={() => handleSubcategoryClick(subcategory.name)}
                    >
                      <span
                        className={`${
                          subcategory.name === activeSubcategory ? "text-blue-500" : "text-gray-700"
                        } font-light text-sm sm:text-base`}
                      >
                        {subcategory.name}
                      </span>
                      {subcategory.name === activeSubcategory ? (
                        <ChevronDown className="h-5 w-5 text-blue-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  ))}
              </div>
            )}

            {/* Right Column - Popular Topics (only shown when a subcategory is active) */}
            {activeSubcategory && (
              <div className="w-full sm:w-[250px] md:w-[300px] max-h-[60vh] sm:max-h-[80vh] overflow-y-auto border-t sm:border-t-0 sm:border-l">
                {/* Back button for mobile */}
                <div
                  className="p-3 sm:hidden flex items-center text-blue-500 cursor-pointer"
                  onClick={() => setActiveSubcategory(null)}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  <span className="font-light text-sm">Back to {activeCategory}</span>
                </div>

                <div className="p-3 sm:p-4 border-b">
                  <h3 className="font-light text-gray-700 text-sm sm:text-base">Popular topics</h3>
                </div>
                {categoriesData
                  .find((cat) => cat.name === activeCategory)
                  ?.subcategories.find((sub) => sub.name === activeSubcategory)
                  ?.topics.map((topic, index) => (
                    <Link
                      href={`/topics/${encodeURIComponent(topic.toLowerCase().replace(/\s+/g, "-"))}`}
                      key={index}
                      className="block p-3 sm:p-4 hover:bg-gray-100 transition-colors duration-150"
                    >
                      <span className="text-gray-700 font-light text-sm sm:text-base">{topic}</span>
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
