"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-12 h-6 bg-gray-200 rounded-full p-1 flex items-center">
        <div className="w-4 h-4 bg-blue-500 rounded-full transform translate-x-0"></div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full p-1 flex items-center"
      aria-label="Toggle theme"
    >
      <div
        className={`w-4 h-4 bg-blue-500 rounded-full transform transition-transform duration-200 ${
          theme === "dark" ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </button>
  )
}
