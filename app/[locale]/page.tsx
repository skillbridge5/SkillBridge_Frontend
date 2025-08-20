import { Navbar } from "@/app/[locale]/components/navbar";
import { HeroSection } from "@/app/[locale]/components/hero-section";
import { ServicesSection } from "@/app/[locale]/components/services-section";
import { CoursesSection } from "@/app/[locale]/components/courses-section";
import { InstructorsSection } from "@/app/[locale]/components/instructors-section";
import { TestimonialsSection } from "@/app/[locale]/components/testimonials-section";
import { SuccessSection } from "@/app/[locale]/components/success-section";
import Footer from "@/app/[locale]/components/footer";

export const metadata = {
      title: "SkillBridge | Upskill with Expert-Led Courses & Training",
      description: "SkillBridge connects learners with expert instructors for high-quality courses, training, and career advancement. Explore our services and join our success stories.",
      openGraph: {
        title: "SkillBridge | Upskill with Expert-Led Courses",
        description: "Join SkillBridge to access top-notch courses, learn from industry-leading instructors, and boost your career with our proven success stories.",
      },
      image: "https://i.ibb.co/ZRYfMLWK/skills.png",
      url: "https://skill-bridge-iot.vercel.app/",
      googleSiteVerification: "tK8jg7pTludPfa4R8AfjqPslodhRAJbKY1AYdI_z70g",
      twitter: {
        card: "summary_large_image",
        title: "SkillBridge | Upskill with Expert-Led Courses",
        description: "Join SkillBridge to access top-notch courses, learn from industry-leading instructors, and boost your career with our proven success stories.",
        creator: "@skillbridge",
        images: ["https://i.ibb.co/ZRYfMLWK/skills.png"],
      },
      icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
        shortcut: "/shortcut-icon.png",
      },
      keywords: [
        "SkillBridge",
        "online courses",
        "expert instructors",
        "career advancement",
        "professional training",
        "upskill",
        "learning platform",
        "success stories",
        "education",
        "skill development"
      ],
      authors: [
        {
          name: "SkillBridge Team",
          url: "https://skill-bridge-iot.vercel.app/",
        },
      ],

}


export default function Home() {
  return (
    <>
    <div className='min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 font-montserrat'>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <CoursesSection />
      <InstructorsSection />
      <TestimonialsSection />
      <SuccessSection />
      <Footer />
    </div>
    </>
  );
}
