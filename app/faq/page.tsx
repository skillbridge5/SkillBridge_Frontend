import { Navbar } from "@/components/navbar";
import React from "react";

const FaqPage = () => {
  return (
    <div className='min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 font-montserrat'>
      <Navbar />
      <section className='container !mx-auto px-4 lg:px-0 lg:pl-8 pb-16'>
        Hello Welcome, This is FAQ page!
      </section>
    </div>
  );
};

export default FaqPage;
