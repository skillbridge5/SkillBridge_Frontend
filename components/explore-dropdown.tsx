"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, ChevronRight, ChevronLeft } from "lucide-react"
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
      <button
        
        className="border-[1.5px] border-blue-300  flex items-center gap-1 sm:gap-2 h-7 sm:h-9 px-2 sm:px-3  sm:h-10 md:px-4 text-[9px] sm:text-xs md:text-sm lg:text-base"
        onClick={toggleExplore}
      >
        Explore {isExploreOpen ? <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" /> : <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />}
      </button>

      {isExploreOpen && (
        <div className="absolute -left-20 sm:-left-16 md:-left-25 lg:-left-10 top-full mt-10 z-50">
          <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg border overflow-hidden flex flex-col sm:flex-row max-w-[80vw] sm:max-w-[80vw] md:max-w-[720px] lg:max-w-[900px]">
            {/* Left Column - Categories */}
            <div className="w-[172px] sm:w-[250px] md:w-[300px] max-h-[60vh] sm:max-h-[80vh] overflow-y-auto">
              <div className="font-bold px-3 pt-3 sm:px-4 sm:pt-3">
                <h3 className="text-[#646464] dark:text-[#9a9a9a] text-xs sm:text-sm lg:text-base">Browse Certifications</h3>
              </div>
              <div className="p-3 sm:px-4 border-b">
                <h3 className="text-gray-800 dark:text-gray-300 text-xs sm:text-sm lg:text-base">Certification preparation</h3>
              </div>
              {categoriesData.map((category, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between text-[9px] sm:text-xs lg:text-sm px-3 py-1 sm:px-4 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-150 ${
                    category.name === activeCategory ? "bg-gray-50 dark:bg-gray-700" : ""
                  }`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <span
                    className={`${
                      category.name === activeCategory ? "text-[#2196F3]" : "text-gray-800 dark:text-gray-300"
                    } font-light text-[9px] sm:text-xs lg:text-sm 2xl:text-base`}
                  >
                    {category.name}
                  </span>
                  {category.name === activeCategory ? (
                    <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-[#2196F3]" />
                  ) : (
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                  )}
                </div>
              ))}
            </div>

            {/* Middle Column - Subcategories (only shown when a category is active) */}
            {activeCategory && (
              <div className="w-full sm:w-[250px] md:w-[300px] max-h-[60vh] sm:max-h-[80vh] overflow-y-auto border-t sm:border-t-0 sm:border-l">
                {/* Back button for mobile */}
                <div
                  className="px-3 py-2 sm:px-4 sm:py-3 sm:hidden flex items-center text-[#2196F3] cursor-pointer"
                  onClick={() => setActiveCategory(null)}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  <span className="text-[9px] sm:text-xs">Back to Categories</span>
                </div>

                {categoriesData
                  .find((cat) => cat.name === activeCategory)
                  ?.subcategories.map((subcategory, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-150 ${
                        subcategory.name === activeSubcategory ? "bg-gray-50 dark:bg-gray-700" : ""
                      }`}
                      onClick={() => handleSubcategoryClick(subcategory.name)}
                    >
                      <span
                        className={`${
                          subcategory.name === activeSubcategory ? "text-[#2196F3]" : "text-gray-800 dark:text-gray-300"
                        } font-light text-[9px] sm:text-xs lg:text-sm 2xl:text-base`}
                      >
                        {subcategory.name}
                      </span>
                      {subcategory.name === activeSubcategory ? (
                        <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-[#2196F3]" />
                      ) : (
                        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
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
                  className="p-3 sm:hidden flex items-center text-[#2196F3] cursor-pointer"
                  onClick={() => setActiveSubcategory(null)}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  <span className="font-light text-[8px] sm:text-xs">Back to {activeCategory}</span>
                </div>

                <div className="px-3 py-2 sm:px-4 sm:py-3 border-b">
                  <h3 className="text-gray-800 dark:text-gray-300 text-xs sm:text-sm lg:text-base">Popular topics</h3>
                </div>
                {categoriesData
                  .find((cat) => cat.name === activeCategory)
                  ?.subcategories.find((sub) => sub.name === activeSubcategory)
                  ?.topics.map((topic, index) => (
                    <Link
                      href={`/topics/${encodeURIComponent(topic.toLowerCase().replace(/\s+/g, "-"))}`}
                      key={index}
                      className="block px-3 py-2 sm:px-4  hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
                    >
                      <span className="text-gray-800 dark:text-gray-300 font-light text-[9px] sm:text-xs lg:text-sm 2xl:text-base">{topic}</span>
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
