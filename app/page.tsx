import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { CoursesSection } from "@/components/courses-section";
import { InstructorsSection } from "@/components/instructors-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { SuccessSection } from "@/components/success-section";
import { servicesData } from "@/data/services";
import Footer from "@/components/footer";

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
