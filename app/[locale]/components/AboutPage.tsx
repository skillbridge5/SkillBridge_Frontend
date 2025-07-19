
import Image from "next/image"
import { Users, Target, Code, Star, CheckCircle, Clock, Trophy, BookOpen, Zap, GraduationCap } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

export default function AboutPage() {
  return (
    <>
      {/* Hero Section - Removed colored background */}
      <section className="text-gray-900 dark:text-white py-32 px-4 relative min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4">
                <Badge className="text-sm px-3 py-1 text-white border-0" style={{ backgroundColor: "#2196F3", opacity: 0.5 }}>
                  Transforming Careers Since 2020!
                </Badge>
              </div>
              <h1 className="text-6xl font-bold mb-6 leading-tight whitespace-nowrap">
                <span style={{ color: "#2196F3" }}>Learn. Build.</span> <span className="text-orange-400">Launch.</span>
              </h1>
              <p className="text-lg mb-8 text-gray-600 dark:text-gray-300 leading-relaxed">
                SkillBridge Technologies - Where passionate learners become industry-ready developers through hands-on
                projects, expert mentorship, and proven learning methodologies.
              </p>
              <div className="flex gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" style={{ color: "#2196F3" }} />
                  <span style={{ color: "#2196F3" }}>4.8/5 Student Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" style={{ color: "#2196F3" }} />
                  <span style={{ color: "#2196F3" }}>Job Guarantee</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 text-center shadow-lg w-64 h-64 flex flex-col justify-center">
                <div className="w-32 h-32 mx-auto mb-3 relative">
                  <Image
                    src="/images/about/skills.png?height=128&width=128"
                    alt="SkillBridge Logo"
                    width={128}
                    height={128}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">SkillBridge</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium text-sm">Institute Of Technology</p>
              </div>
            </div>
          </div>
        </div>
      </section>


{/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Our Story</h2>
              <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  SkillBridge Technologies was founded in 2020 with a simple yet powerful vision: to bridge the gap
                  between traditional education and the rapidly evolving tech industry. Our founders, experienced
                  software engineers and educators, recognized that many talented individuals were struggling to break
                  into the tech field due to outdated curricula and lack of practical, hands-on experience.
                </p>
                <p>
                  What started as a small coding bootcamp in a shared workspace has grown into a comprehensive school of
                  software development, serving thousands of students worldwide. We believe that everyone deserves
                  access to quality tech education, regardless of their background or previous experience.
                </p>
                <p>
                  Our story is one of passion, dedication, and the unwavering belief that with the right guidance and
                  support, anyone can master the art of software development and build a successful career in
                  technology.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/about/about_image1.webp"
                  alt="Our Story Image"
                  width={500}
                  height={360}
                  className="object-cover w-full h-full"
                  style={{ width: "100%", height: "360px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>


{/* Our Purpose Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 -mx-4 lg:-mx-8 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Purpose</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We exist to democratize tech education and create pathways for anyone to build a successful career in
              software development.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
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
                  <CardTitle className="text-2xl dark:text-white" style={{ color: "#2196F3" }}>
                    Mission
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  To provide world-class, practical software development education that transforms lives. We bridge the
                  gap between learning and doing, ensuring every graduate is not just knowledgeable but job-ready and
                  confident.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: "#2196F3" }} />
                    <span>Practical, hands-on learning approach</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: "#2196F3" }} />
                    <span>Industry-relevant curriculum</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: "#2196F3" }} />
                    <span>Inclusive and supportive community</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-orange-500 shadow-sm h-full dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="pb-4">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mr-3">
                    <Zap className="w-5 h-5 text-orange-600" />
                  </div>
                  <CardTitle className="text-2xl text-orange-600 dark:text-orange-400">Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  To become the global standard for practical tech education, where talent and dedication matter more
                  than traditional credentials. We envision a world where our graduates lead innovation at every level
                  of the tech industry.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />


<span>Global recognition and impact</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />
                    <span>Merit-based career advancement</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />
                    <span>Industry leadership development</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Learning Methodology */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Learning Methodology</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">How we turn beginners into job-ready developers</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                  style={{ backgroundColor: "#2196F3" }}
                >
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white" style={{ color: "#2196F3" }}>
                    Learn by Doing
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Start coding from day one. Every concept is immediately applied in hands-on projects that simulate
                    real work environments.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                  style={{ backgroundColor: "#2196F3" }}
                >
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white" style={{ color: "#2196F3" }}>
                    Build Real Projects
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Create applications that solve actual problems. Your portfolio will showcase real solutions, not
                    just tutorial projects.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                  style={{ backgroundColor: "#2196F3" }}
                >
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white" style={{ color: "#2196F3" }}>
                    Get Expert Feedback
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Receive detailed code reviews and personalized guidance from industry professionals who've been
                    where you want to go.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                  style={{ backgroundColor: "#2196F3" }}
                >


<span className="text-white font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white" style={{ color: "#2196F3" }}>
                    Land Your Dream Job
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Leverage our industry connections, interview prep, and job placement support to secure your first
                    developer role.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gray-900 dark:bg-gray-700 rounded-2xl overflow-hidden">
                <Image
                  src="/images/about/about_image2.jpg"
                  alt="Learning Methodology"
                  width={450}
                  height={350}
                  className="object-cover"
                  style={{ width: "450px", height: "350px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Students Choose SkillBridge - Made Shorter */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 -mx-4 lg:-mx-8 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Students Choose SkillBridge</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              The learning experience that actually prepares you for your first dev job
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-full flex flex-col min-h-[200px]">
              <CardHeader className="pb-3 flex-shrink-0">
                <div
                  className="mx-auto w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: "rgba(33, 150, 243, 0.1)" }}
                >
                  <BookOpen className="w-6 h-6" style={{ color: "oklch(44.6% 0.03 256.802)" }} />
                </div>
                <CardTitle className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  Industry-Relevant Curriculum
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow px-4 pb-4">
                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                  Courses designed by industry professionals, updated regularly with cutting-edge skills employers seek.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-full flex flex-col min-h-[200px]">
              <CardHeader className="pb-3 flex-shrink-0">
                <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-3">
                  <Users className="w-6 h-6" style={{ color: "oklch(44.6% 0.03 256.802)" }} />
                </div>
                <CardTitle className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  Expert Instructors
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow px-4 pb-4">
                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                  Learn from experienced engineers and tech leaders with real-world experience from top companies.
                </p>
              </CardContent>
            </Card>


<Card className="text-center hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-full flex flex-col min-h-[200px]">
              <CardHeader className="pb-3 flex-shrink-0">
                <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-3">
                  <Code className="w-6 h-6" style={{ color: "oklch(44.6% 0.03 256.802)" }} />
                </div>
                <CardTitle className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  Hands-On Learning
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow px-4 pb-4">
                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                  Build real projects through practical exercises that reinforce understanding and build your portfolio.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-full flex flex-col min-h-[200px]">
              <CardHeader className="pb-3 flex-shrink-0">
                <div className="mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-3">
                  <GraduationCap className="w-6 h-6" style={{ color: "oklch(44.6% 0.03 256.802)" }} />
                </div>
                <CardTitle className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  Career Support
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow px-4 pb-4">
                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                  Complete career services including resume building, interview prep, and job placement assistance.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-full flex flex-col min-h-[200px]">
              <CardHeader className="pb-3 flex-shrink-0">
                <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6" style={{ color: "oklch(44.6% 0.03 256.802)" }} />
                </div>
                <CardTitle className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  Flexible Learning
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow px-4 pb-4">
                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                  Full-time, part-time, and online options to fit your schedule and learning preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-full flex flex-col min-h-[200px]">
              <CardHeader className="pb-3 flex-shrink-0">
                <div className="mx-auto w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-3">
                  <Trophy className="w-6 h-6" style={{ color: "oklch(44.6% 0.03 256.802)" }} />
                </div>
                <CardTitle className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  Proven Results
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow px-4 pb-4">
                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                  85% job placement rate within 6 months with competitive starting salaries.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


{/* Complete Learning Paths - Made Shorter */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Complete Learning Paths</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              From zero to hired - structured programs that get results
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Career-Focused Programs</h3>
              <div className="space-y-4">
                <Card
                  className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-l-4 h-full dark:border-gray-700"
                  style={{ borderLeftColor: "#2196F3" }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-base text-gray-900 dark:text-white">
                        Full Stack Web Development
                      </h4>
                      <Badge className="text-xs px-2 py-1 text-white" style={{ backgroundColor: "#2196F3" }}>
                        Most Popular
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3 text-xs leading-relaxed">
                      Master React, Node.js, databases, and cloud deployment. Build 5 full-stack applications.
                    </p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                      <Clock className="w-3 h-3 mr-1" style={{ color: "oklch(44.6% 0.03 256.802)" }} />
                      <span style={{ color: "oklch(44.6% 0.03 256.802)" }}>16 weeks • Portfolio included</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-l-4 border-l-orange-500 h-full dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-base text-gray-900 dark:text-white">Mobile App Development</h4>
                      <Badge className="text-xs px-2 py-1 text-white border-0" style={{ backgroundColor: "#f97316" }}>
                        High Demand
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3 text-xs leading-relaxed">
                      Build iOS and Android apps with React Native and Flutter. Deploy to app stores.
                    </p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                      <Clock className="w-3 h-3 mr-1" style={{ color: "oklch(44.6% 0.03 256.802)" }} />
                      <span style={{ color: "oklch(44.6% 0.03 256.802)" }}>14 weeks • 3 published apps</span>
                    </div>
                  </CardContent>
                </Card>


<Card
                  className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-l-4 h-full dark:border-gray-700"
                  style={{ borderLeftColor: "#2196F3" }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-base text-gray-900 dark:text-white">Data Science & AI</h4>
                      <Badge className="text-xs px-2 py-1 text-white" style={{ backgroundColor: "#2196F3" }}>
                        Future-Ready
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3 text-xs leading-relaxed">
                      Python, machine learning, data visualization. Work with real datasets from day one.
                    </p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                      <Clock className="w-3 h-3 mr-1" style={{ color: "oklch(44.6% 0.03 256.802)" }} />
                      <span style={{ color: "oklch(44.6% 0.03 256.802)" }}>18 weeks • ML projects</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gray-900 dark:bg-gray-700 rounded-2xl overflow-hidden">
                <Image
                  src="/images/about/about_image3.webp"
                  alt="Complete Learning Paths"
                  width={450}
                  height={400}
                  className="object-cover"
                  style={{ width: "450px", height: "400px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Start Your Journey */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 -mx-4 lg:-mx-8 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Join thousands of successful graduates who transformed their careers with SkillBridge Technologies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="px-8 py-3 text-base text-white hover:opacity-90"
              style={{ backgroundColor: "#2196F3" }}
            >
              Explore Programs
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 text-base bg-transparent hover:bg-opacity-10 dark:border-gray-600 dark:text-gray-300"
              style={{ borderColor: "#2196F3", color: "#2196F3" }}
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}