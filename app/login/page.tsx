import { Navbar } from "@/components/navbar";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className='min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 font-montserrat'>
      <Navbar />
      <section className='container !mx-auto px-4 lg:px-0 lg:pl-8 pb-16'>
        <p>
          Hello Welcome, This is Login page!
        </p>
        <p>
          You don't have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </section>
    </div>
  );
};

export default LoginPage;
