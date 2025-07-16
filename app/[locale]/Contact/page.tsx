"use client";

import { Navbar } from "@/app/[locale]/components/navbar";
import Footer from "@/app/[locale]/components/footer";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const t = useTranslations("contactPage");

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

  return (
    <div className='min-h-screen font-montserrat bg-white dark:bg-gray-950 transition-colors duration-300 flex flex-col'>
      <Navbar />

      <main className='flex-grow container mx-auto px-4 py-12 lg:px-16'>
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className='flex-1 space-y-6 shadow-md p-8 rounded-lg bg-white'>
            <h1 className='text-4xl font-bold text-blue-500'>
              {t("span1")} <span className='text-orange-500'>{t("span2")}</span> {t("span3")}
            </h1>
            <p>{t("description")}</p>
            <div className='space-y-4'>
              <div>
                <h4 className='font-semibold'>📞 {t("phoneLabel")}</h4>
                <p>+251-901-123-456</p>
              </div>
              <div>
                <h4 className='font-semibold'>📧 {t("emailAddress")}</h4>
                <p>skillbridgeinstituteoftech@gmail.com</p>
              </div>
              <div>
                <h4 className='font-semibold'>📍 {t("office")}</h4>
                <p>{t("office_info")}</p>
              </div>
              <div>
                <h4 className='font-semibold'>📨 {t("telegram")}</h4>
                <p>@skillbridgesupport2</p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className='flex-1 shadow-md p-8 rounded-lg bg-white space-y-4'
          >
            <h2 className='text-2xl font-bold mb-2'>{t("message")}</h2>
            <input
              name='name'
              type='text'
              placeholder={t("namePlaceholder")}
              className='w-full border px-4 py-2 rounded'
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name='email'
              type='email'
              placeholder={t("emailPlaceholder")}
              className='w-full border px-4 py-2 rounded'
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              name='phone'
              type='text'
              placeholder='Phone'
              className='w-full border px-4 py-2 rounded'
              value={form.phone}
              onChange={handleChange}
            />
            <textarea
              name='message'
              placeholder={t("meessagePlaceholder")}
              className='w-full border px-4 py-2 rounded h-32'
              value={form.message}
              onChange={handleChange}
              required
            />
            <button
              type='submit'
              className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition'
            >
              {t("messageButton")}
            </button>
          </form>
        </div>

        <div className='mt-16'>
          <h2 className='text-xl font-semibold text-center mb-4'>
            {t("mapTitle")}
          </h2>
          <div className='w-full h-96 rounded-lg overflow-hidden'>
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
