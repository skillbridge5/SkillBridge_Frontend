"use client"

import Link from "next/link"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone
} from "lucide-react"
import { motion } from "framer-motion"

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export default function Footer() {
  return (
    <footer className="bg-blue-400 text-white dark:bg-[#2396f3]/60">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-bold mb-4">About SkillBirdge</h3>
            <p className="text-xs md:text-[14px] text-white/90 mb-4">
              Bridging Gaps, Building Skills, Transforming Futures. We provide high-quality online courses to help you
              advance your career.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.div key={i} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <Link href="#" className="hover:text-white/80">
                    <Icon size={20} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/courses", label: "All Courses" },
                { href: "/about", label: "About Us" },
                { href: "/instructors", label: "Instructors" },
                { href: "/jobs", label: "Jobs & Scholarships" },
                { href: "/blog", label: "Blog" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="hover:text-white/80">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-bold mb-4">Popular Categories</h3>
            <ul className="space-y-2">
              {[
                { href: "/courses/development", label: "Development" },
                { href: "/courses/business", label: "Business" },
                { href: "/courses/design", label: "Design" },
                { href: "/courses/ai", label: "Artificial Intelligence" },
                { href: "/courses/blockchain", label: "Blockchain" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="hover:text-white/80">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
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
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="border-t border-white/30 mt-8 pt-8 text-center text-white/80"
        >
          <p>&copy; {new Date().getFullYear()} SkillBirdge. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
