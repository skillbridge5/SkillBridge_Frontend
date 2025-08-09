import { Navbar } from "@/app/[locale]/components/navbar";
import { HeroSection } from "@/app/[locale]/components/hero-section";
import { ServicesSection } from "@/app/[locale]/components/services-section";
import { CoursesSection } from "@/app/[locale]/components/courses-section";
import { InstructorsSection } from "@/app/[locale]/components/instructors-section";
import { TestimonialsSection } from "@/app/[locale]/components/testimonials-section";
import { SuccessSection } from "@/app/[locale]/components/success-section";
import Footer from "@/app/[locale]/components/footer";
import Head from "next/head";

export default function Home() {
  return (
    <>
    <Head>
      <title>SkillBridge | Upskill with Expert-Led Courses & Training</title>
      <meta
        name="description"
        content="SkillBridge connects learners with expert instructors for high-quality courses, training, and career advancement. Explore our services and join our success stories."
      />
      <meta
        property="og:title"
        content="SkillBridge | Upskill with Expert-Led Courses"
      />
      <meta
        property="og:description"
        content="Join SkillBridge to access top-notch courses, learn from industry-leading instructors, and boost your career with our proven success stories."
      />
      <meta property="og:image" content="https://i.ibb.co/ZRYfMLWK/skills.png" />
      <meta property="og:url" content="https://skill-bridge-iot.vercel.app/" />
      <meta name="google-site-verification" content="tK8jg7pTludPfa4R8AfjqPslodhRAJbKY1AYdI_z70g" />
      

    </Head>
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
