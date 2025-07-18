"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  HelpCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Footer() {
  const t = useTranslations();
  const footer = t.raw("footer") as any;

  return (
    <footer className="bg-blue-400 text-white dark:bg-[#2196f3]/40">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* About */}
          <motion.div
            variants={fadeInUp}
            className="lg:mr-2 xl:mr-4 2xl:mr-10 min-[1710px]:mr-16"
          >
            <h3 className="text-lg font-bold mb-4">{footer.title}</h3>
            <p className="text-xs md:text-[14px] text-white/90 mb-4">
              {footer.description}
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link href="#" className="hover:text-white/80">
                    <Icon size={20} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-bold mb-4">
              {footer.quickLinks.title}
            </h3>
            <ul className="space-y-2">
              {footer.quickLinks.links.map(
                (link: { href: string; label: string }, i: number) => (
                  <li key={i}>
                    <Link href={link.href} className="hover:text-white/80">
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          {/* Popular Categories */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-bold mb-4">{footer.popular.title}</h3>
            <ul className="space-y-2">
              {footer.popular.links.map(
                (link: { href: string; label: string }, i: number) => (
                  <li key={i}>
                    <Link href={link.href} className="hover:text-white/80">
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          {/* Contact & FAQ */}
          <motion.div variants={fadeInUp}>
            <div>
              <h3 className="text-lg font-bold mb-4">{footer.contact.title}</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-white" />
                  <a href="mailto:john@gmail.com" className="hover:text-white/80">
                    john@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-white" />
                  <a href="tel:+2512345436" className="hover:text-white/80">
                    +251 2345 4365
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <Link
                href="/faq"
                className="relative text-white/80 hover:text-white top-6 lg:top-12"
              >
                <HelpCircle className="w-8 h-8 md:h-10 md:w-10 lg:w-12 lg:h-12 2xl:h-14 2xl:w-14 text-[#E57C00] hover:text-[#F48000] hover:scale-105" />
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="border-t border-white/30 mt-8 pt-8 text-center text-white/80 text-sm md:text-base"
        >
          <p>&copy; {new Date().getFullYear()} {footer.copyright.text}</p>
        </motion.div>
      </div>
    </footer>
  );
}
