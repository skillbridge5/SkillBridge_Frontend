import { Navbar } from "@/app/[lang]/components/navbar";
import { HeroSection } from "@/app/[lang]/components/hero-section";
import { ServicesSection } from "@/app/[lang]/components/services-section";
import { CoursesSection } from "@/app/[lang]/components/courses-section";
import { InstructorsSection } from "@/app/[lang]/components/instructors-section";
import { TestimonialsSection } from "@/app/[lang]/components/testimonials-section";
import { SuccessSection } from "@/app/[lang]/components/success-section";
import { servicesData } from "@/app/[lang]/data/services";
import Footer from "@/app/[lang]/components/footer";

export default function Home() {
  return (
    <div className='min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 font-montserrat'>
      <Navbar />
      <HeroSection />
      <ServicesSection services={servicesData} />
      <CoursesSection />
      <InstructorsSection />
      <TestimonialsSection />
      <SuccessSection />
      <Footer />
    </div>
  );
}
