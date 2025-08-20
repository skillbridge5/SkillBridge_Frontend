"use client"

import Image from "next/image"
import { Users, Target, Code, Star, CheckCircle, Clock, Trophy, BookOpen, Zap, GraduationCap } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"

const iconMap = {
  1: BookOpen,
  2: Users,
  3: Code,
  4: GraduationCap,
  5: Clock,
  6: Trophy,
}

const colorMap = {
  1: "rgba(33, 150, 243, 0.1)",
  2: "rgba(33, 150, 243, 0.1)",
  3: "rgba(33, 150, 243, 0.1)",
  4: "rgba(33, 150, 243, 0.1)",
  5: "rgba(33, 150, 243, 0.1)",
  6: "rgba(33, 150, 243, 0.1)",
}

const darkColorMap = {
  1: "rgba(33, 150, 243, 0.2)",
  2: "rgba(33, 150, 243, 0.2)",
  3: "rgba(33, 150, 243, 0.2)",
  4: "rgba(33, 150, 243, 0.2)",
  5: "rgba(33, 150, 243, 0.2)",
  6: "rgba(33, 150, 243, 0.2)",
}

export default function AboutPage() {
  const t = useTranslations()
  const aboutPage = t.raw("aboutPage") as any

  return (
    <div className="w-full">
      {/* Hero Section - Optimized for all devices */}
      <section className="text-gray-900 dark:text-white py-12 md:py-16 relative min-h-[500px] md:min-h-[580px] flex items-center bg-[#fafcfe] dark:bg-gray-950">
        <div
          className="absolute inset-0 bg-[#2196F3]/10 dark:bg-[#2196F3]/5 -z-10"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(33, 150, 243, 0.1), rgba(33, 150, 243, 0.05))",
          }}
        ></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-10 items-center">
            {/* Text Content */}
            <div className="min-w-0 order-2 lg:order-1 mt-8 lg:mt-0">
              <div className="mb-3 md:mb-4">
                {/* <Button className="text-xs sm:text-sm px-3 py-1 text-white border-0" style={{ backgroundColor: "#61b6fa" }}>
                  {aboutPage.title}
                </Button> */}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6 leading-tight whitespace-nowrap">
                <span style={{ color: "#2196F3" }}>Learn.</span> <span className="text-orange-400">Launch.</span>{" "}
                <span style={{ color: "#2196F3" }}>Lead.</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 md:mb-8 text-sm sm:text-base md:text-lg">
                SkillBridge Institute of Technology – Empowering future professionals with real-world skills, guided
                mentorship, and project-based learning that leads to career success.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: "#2196F3" }} />
                  <span style={{ color: "#2196F3" }}>4.8/5 {aboutPage.ratingText}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: "#2196F3" }} />
                  <span style={{ color: "#2196F3" }}>{aboutPage.jobText}</span>
                </div>
              </div>
            </div>

            {/* Image Content */}
            <div className="flex justify-center order-1 lg:order-2">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 sm:p-6 md:p-8 text-center shadow-lg w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] h-auto aspect-square flex flex-col justify-center opacity-90">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto mb-3 sm:mb-4 relative">
                  <Image
                    src="/images/about/skills.png"
                    alt="SkillBridge Logo"
                    width={128}
                    height={128}
                    className="rounded-full"
                    priority
                  />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                  SkillBridge
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base font-medium">
                  Institute Of Technology
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">
                {aboutPage.storyHeading}
              </h2>
              <div className="space-y-4 md:space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>{aboutPage.storyText1}</p>
                <p>{aboutPage.storyText2}</p>
                <p>{aboutPage.storyText3}</p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden">
                <Image
                  src="/images/about/about_image1.webp"
                  alt="Our Story Image"
                  width={500}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Purpose Section */}
      <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {aboutPage.purpose.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {aboutPage.purpose.subtitle}
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {/* Mission Card */}
            <Card
              className="border-l-4 shadow-sm h-full dark:bg-gray-800 dark:border-gray-700"
              style={{ borderLeftColor: "#2196F3" }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center mb-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                    style={{ backgroundColor: "rgba(33, 150, 243, 0.1)" }}
                  >
                    <Target className="w-5 h-5" style={{ color: "#2196F3" }} />
                  </div>
                  <CardTitle className="text-xl md:text-2xl dark:text-white" style={{ color: "#2196F3" }}>
                    {aboutPage.purpose.mission.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {aboutPage.purpose.mission.description}
                </p>
                <div className="space-y-3">
                  {Object.values(aboutPage.purpose.mission.checkPoint).map((point: any, index: number) => (
                    <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: "#2196F3" }} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Vision Card */}
            <Card className="border-l-4 border-l-orange-500 shadow-sm h-full dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="pb-4">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mr-3">
                    <Zap className="w-5 h-5 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl md:text-2xl text-orange-600 dark:text-orange-400">
                    {aboutPage.purpose.vision.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {aboutPage.purpose.vision.description}
                </p>
                <div className="space-y-3">
                  {Object.values(aboutPage.purpose.vision.checkpoint).map((point: any, index: number) => (
                    <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Learning Methodology */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {aboutPage.methodology.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">{aboutPage.methodology.description}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="space-y-6 md:space-y-8">
              {aboutPage.methodology.lists.map((item: any) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{ backgroundColor: "#2196F3" }}
                  >
                    <span className="text-white font-bold text-sm">{item.id}</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 dark:text-white" style={{ color: "#2196F3" }}>
                      {item.heading}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.paragraph}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="aspect-square bg-gray-900 dark:bg-gray-700 rounded-2xl overflow-hidden">
                <Image
                  src="/images/about/about_image2.jpg"
                  alt="Learning Methodology"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Students Choose SkillBridge */}
      <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {aboutPage.whyUs.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">{aboutPage.whyUs.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {aboutPage.whyUs.cards.map((card: any) => {
              const IconComponent = iconMap[card.id as keyof typeof iconMap]
              const bgColor = colorMap[card.id as keyof typeof colorMap]
              const darkBgColor = darkColorMap[card.id as keyof typeof darkColorMap]
              return (
                <Card
                  key={card.id}
                  className="text-center hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-full flex flex-col min-h-[140px]"
                >
                  <CardHeader className="pb-3 flex-shrink-0">
                    <div
                      className="mx-auto w-6 h-6 rounded-lg flex items-center justify-center mb-3"
                      style={{ backgroundColor: bgColor }}
                    >
                      <IconComponent className="w-3 h-3" style={{ color: "#2196F3" }} />
                    </div>
                    <CardTitle className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow px-4 pb-4">
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{card.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Complete Learning Paths */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {aboutPage.learningPaths.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">{aboutPage.learningPaths.subtitle}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">
                {aboutPage.learningPaths.header}
              </h3>
              <div className="space-y-4 md:space-y-6">
                {aboutPage.learningPaths.courseLists.map((course: any, index: number) => {
                  const isOrange = course.buttonText === "High Demand"
                  const borderColor = isOrange ? "#f97316" : "#2196F3"
                  const badgeColor = isOrange ? "#f97316" : "#2196F3"
                  return (
                    <Card
                      key={index}
                      className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-l-4 h-full dark:border-gray-700"
                      style={{ borderLeftColor: borderColor }}
                    >
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-base md:text-lg text-gray-900 dark:text-white">
                            {course.courseTitle}
                          </h4>
                          <Button
                            className="text-xs px-2 py-1 text-white border-0"
                            style={{ backgroundColor: badgeColor }}
                          >
                            {course.buttonText}
                          </Button>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                          {course.description}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                          <Clock className="w-3 h-3 mr-1" style={{ color: "#2196F3" }} />
                          <span style={{ color: "#2196F3" }}>{course.reviews}</span>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-gray-900 dark:bg-gray-700 rounded-2xl overflow-hidden">
                <Image
                  src="/images/about/about_image3.webp"
                  alt="Complete Learning Paths"
                  width={480}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Start Your Journey */}
      <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {aboutPage.startJourney.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto">
              {aboutPage.startJourney.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="px-6 md:px-8 py-3 text-base text-white hover:opacity-90"
                style={{ backgroundColor: "#2196F3" }}
              >
                {aboutPage.startJourney.explore}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-6 md:px-8 py-3 text-base bg-transparent hover:bg-opacity-10 dark:border-gray-600 dark:text-gray-300"
                style={{ borderColor: "#2196F3", color: "#2196F3" }}
              >
                {aboutPage.startJourney.consultation}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
