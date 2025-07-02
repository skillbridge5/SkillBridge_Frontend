"use client";

import { Navbar } from "@/app/[locale]/components/navbar";
import Footer from "@/app/[locale]/components/footer";
import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent!");
    console.log(form);
  };

  const scrollToMap = () => {
    const map = document.getElementById("contact-map");
    if (map) map.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className='min-h-screen font-montserrat bg-white dark:bg-gray-950 transition-colors duration-300 flex flex-col'>
      <Navbar />

      <main className='flex-grow container mx-auto px-4 py-12 lg:px-16'>
        <div className='flex flex-col lg:flex-row gap-8'>
   
          <div className='flex-1 shadow-lg p-8 rounded-2xl bg-white border border-gray-200'>
            <h1 className='text-4xl font-bold text-blue-700'>
              Get <span className='text-orange-500'>In Touch</span> With Us
            </h1>
            <p className='text-gray-600 mt-2'>
              We're happy to help! Reach out to us for any questions, feedback,
              or support.
            </p>

       
            <div className='space-y-4 mt-6'>
              <a
                href='tel:+251901123456'
                className='block p-4 rounded-lg border border-gray-100 shadow-sm transition-transform duration-200 hover:translate-y-[-2px] hover:bg-blue-50'
              >
                <h4 className='font-semibold text-gray-800'>📞 Phone number</h4>
                <p className='text-gray-600'>+251-901-123-456</p>
              </a>
               
              <a
                href='mailto:skillbridgeinstituteoftech@gmail.com'
                className='block p-4 rounded-lg border border-gray-100 shadow-sm transition-transform duration-200 hover:translate-y-[-2px] hover:bg-blue-50'
              >
                <h4 className='font-semibold text-gray-800'>📧 Email address</h4>
                <p className='text-gray-600'>skillbridgeinstituteoftech@gmail.com</p>
              </a>

              <button
                onClick={scrollToMap}
                className='w-full text-left p-4 rounded-lg border border-gray-100 shadow-sm transition-transform duration-200 hover:translate-y-[-2px] hover:bg-blue-50'
              >
                <h4 className='font-semibold text-gray-800'>📍 Office address</h4>
                <p className='text-gray-600'>Addis Ababa, Ethiopia</p>
              </button>

              <a
                href='https://t.me/skillbridgesupport2'
                target='_blank'
                rel='noopener noreferrer'
                className='block p-4 rounded-lg border border-gray-100 shadow-sm transition-transform duration-200 hover:translate-y-[-2px] hover:bg-blue-50'
              >
                <h4 className='font-semibold text-gray-800'>📨 Telegram</h4>
                <p className='text-gray-600'>@telegramhandle</p>
              </a>
            </div>
          </div>

     
          <form
            onSubmit={handleSubmit}
            className='flex-1 shadow-lg p-8 rounded-2xl bg-white border border-gray-200 space-y-4'
          >
            <h2 className='text-2xl font-bold mb-2 text-blue-700'>
              Send Us a Message
            </h2>
            <input
              name='name'
              type='text'
              placeholder='Your Name'
              className='w-full border px-4 py-2 rounded outline-blue-500'
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name='email'
              type='email'
              placeholder='Email'
              className='w-full border px-4 py-2 rounded outline-blue-500'
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              name='phone'
              type='text'
              placeholder='Phone'
              className='w-full border px-4 py-2 rounded outline-blue-500'
              value={form.phone}
              onChange={handleChange}
            />
            <textarea
              name='message'
              placeholder='Your Message'
              className='w-full border px-4 py-2 rounded h-32 outline-blue-500'
              value={form.message}
              onChange={handleChange}
              required
            />
            <button
              type='submit'
              className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition'
            >
              Send Message
            </button>
          </form>
        </div>

      
        <div className='mt-16' id='contact-map'>
          <h2 className='text-xl font-semibold text-center mb-4 text-gray-800'>
            Find Us On the Map
          </h2>
          <div className='w-full h-96 rounded-lg overflow-hidden shadow-lg'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.6719600732655!2d38.75776007590039!3d9.030151990986828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85f57f3d87ff%3A0x6f6242500e5b2a4a!2sAddis%20Ababa!5e0!3m2!1sen!2set!4v1687598230123'
              width='100%'
              height='100%'
              style={{ border: 0 }}
              loading='lazy'
              allowFullScreen
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
