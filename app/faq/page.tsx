"use client";
import { Navbar } from "@/components/navbar";
import React, { useState } from "react";
import Image from "next/image";

const faqList = [
  {
    question: "What are the technical requirements for learning at SkillBridge?",
    answer: "To use SkillBridge, you need a smartphone or computer and internet access. For registration, access to one of the supported digital payment methods is required."
  },
  {
    question: "How do I get started with SkillBridge?",
    answer: "Sign up on our website, choose your course, and follow the instructions to begin learning."
  },
  {
    question: "Do you give certificates after completion?",
    answer: "Yes, you will receive a certificate after successfully completing your course."
  },
  {
    question: "Does SkillBridge provide job opportunities?",
    answer: "We connect top-performing students with partner companies and job opportunities where available."
  },
  {
    question: "Who can learn your courses?",
    answer: "Anyone with a passion for tech and willingness to learn can join our courses."
  },
  {
    question: "In what language are you providing the courses?",
    answer: "Our courses are primarily in English, but we are working to add more languages."
  },
  {
    question: "When do we start learning the courses?",
    answer: "You can start learning immediately after enrolling in a course."
  },
  {
    question: "What can I do if I forget my password on website registration?",
    answer: "Use the 'Forgot Password' link on the login page to reset your password."
  },
  {
    question: "Can I get registered via email?",
    answer: "Yes, you can register using your email address on our sign-up page."
  },
  {
    question: "Is it an online class or online course?",
    answer: "SkillBridge offers both live online classes and self-paced online courses to fit your schedule."
  },
];

const FaqPage = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#D6EBFC] font-montserrat">
      <Navbar />
      <section className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
        {/* Left Side - Fixed Image */}
        <div className="hidden md:flex md:w-1/2 h-full items-center justify-center fixed top-[64px] left-0 z-0">
          <div className="w-[80%] h-[80%] max-w-lg max-h-[80vh] rounded-3xl overflow-hidden shadow-lg bg-white m-8 flex items-center justify-center">
            <Image
              src="/faq.png"
              alt="FAQ Illustration"
              fill
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
        {/* Right Side - Card-based Dropdown FAQ */}
        <div className="w-full md:ml-[50%] md:w-1/2 h-full overflow-y-auto px-4 py-8 flex flex-col items-center z-10 bg-[#D6EBFC]">
          <div className="w-full max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2196F3] mb-2">
              Frequently Asked <span className="text-[#2196F3]">Questions</span>
            </h1>
            <p className="text-gray-600 mb-6">
              Have more questions? We understand that every situation is unique. If your concern wasn&apos;t addressed in the FAQs, feel free to get in touch—we&apos;re always here to provide the support you need.
            </p>
            <div className="flex flex-col gap-4">
              {faqList.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                >
                  <div className="p-5 flex justify-between items-center">
                    <span className="font-semibold text-lg">{faq.question}</span>
                    <span className="ml-2 text-2xl text-[#2196F3]">
                      {openIdx === idx ? "−" : "+"}
                    </span>
                  </div>
                  {openIdx === idx && (
                    <div className="px-5 pb-5 text-gray-700 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqPage;
