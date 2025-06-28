"use client";
import { Navbar } from "@/components/navbar";
import React, { useState } from "react";
import Image from "next/image";
import Footer from "@/components/footer";

const faqList = [
  {
    question:
      "What are the technical requirements for learning at SkillBridge?",
    answer:
      "To use SkillBridge, you need a smartphone or computer and internet access. For registration, access to one of the supported digital payment methods is required.",
  },
  {
    question: "How do I get started with SkillBridge?",
    answer:
      "Sign up on our website, choose your course, and follow the instructions to begin learning.",
  },
  {
    question: "Do you give certificates after completion?",
    answer:
      "Yes, you will receive a certificate after successfully completing your course.",
  },
  {
    question: "Does SkillBridge provide job opportunities?",
    answer:
      "We connect top-performing students with partner companies and job opportunities where available.",
  },
  {
    question: "Who can learn your courses?",
    answer:
      "Anyone with a passion for tech and willingness to learn can join our courses.",
  },
  {
    question: "In what language are you providing the courses?",
    answer:
      "Our courses are primarily in English, but we are working to add more languages.",
  },
  {
    question: "When do we start learning the courses?",
    answer: "You can start learning immediately after enrolling in a course.",
  },
  {
    question: "What can I do if I forget my password on website registration?",
    answer:
      "Use the 'Forgot Password' link on the login page to reset your password.",
  },
  {
    question: "Can I get registered via email?",
    answer:
      "Yes, you can register using your email address on our sign-up page.",
  },
  {
    question: "Is it an online class or online course?",
    answer:
      "SkillBridge offers both live online classes and self-paced online courses to fit your schedule.",
  },
];

const FaqPage = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className='bg-[#D6EBFC] font-montserrat'>
      <Navbar />

      <section className=''>
        <div className='relative z-10 mx-auto'>
          {/* Image with full width/height */}
          <img
            src='images/help_image.png'
            alt='Banner background'
            className='w-full h-[480px] object-cover 2xl:place-content-center 2xl:mx-auto 2xl:object-fill 2xl:min-w-screen 2xl:h-[600px]'
          />

          {/* Text overlay (same as before but with absolute positioning) */}
          <div className='absolute top-[200px] 2xl:top-72 left-20 2xl:left-40 w-[70%] p-4 2xl:p-8 flex flex-col justify-start items-start text-left bg-[#dddddd57]'>
            <div className='mr-auto ml-8 font-montserrat '>
              <h1 className='font-bold text-[#ffc107] drop-shadow-[2px_2px_3px_rgba(0,0,0,1)] text-3xl 2xl:text-4xl'>
                Frequently asked questions
              </h1>
              <h6 className=' drop-shadow-[2px_2px_3px_rgba(0,0,0,1)] text-white text-xl 2xl:text-2xl font-semibold mt-2'>
                We are here to help!
              </h6>
            </div>
          </div>
        </div>
        <div className='container px-8 pt-12 pb-20 mx-auto xl:min-w-7xl'>
          <div className='w-full '>
            <h1 className='text-4xl md:text-5xl font-bold text-[#2196F3] mb-2'>
              Frequently Asked <span className='text-[#2196F3]'>Questions</span>
            </h1>
            <p className='text-gray-600 mb-6 text-base 2xl:text-lg 2xl:mt-2'>
              Have more questions? We understand that every situation is unique.
              If your concern wasn&apos;t addressed in the FAQs, feel free to
              get in touch—we&apos;re always here to provide the support you
              need.
            </p>
            <div className='flex flex-col gap-4'>
              {faqList.map((faq, idx) => (
                <div
                  key={idx}
                  className='bg-white rounded-xl shadow-md transition-all duration-200 cursor-pointer'
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                >
                  <div className='p-5 flex justify-between items-center'>
                    <span className='font-semibold text-lg 2xl:text-xl'>
                      {faq.question}
                    </span>
                    <span className='ml-2 text-2xl 2xl:text-3xl text-[#2196F3]'>
                      {openIdx === idx ? "−" : "+"}
                    </span>
                  </div>
                  {openIdx === idx && (
                    <div className='px-5 pb-5 text-gray-700 animate-fade-in text-base 2xl:text-lg'>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FaqPage;
