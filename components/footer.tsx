"use client"

import Link from "next/link"
import { Twitter, Linkedin, Facebook, Instagram, Youtube } from "lucide-react"
import { footerSections } from "@/data/footer-links"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="bg-[#EEF4FF] text-[#2396F3] dark:bg-[#EEF4FF]/10 pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 justify-center gap-8 mb-12">
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-[#2396F3] hover:text-[#2396F3]/80 text-sm transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className=" bg-[#2396F3] dark:bg-[#2396F3]/40 border border-blue-40 py-6 sm:py-10 md:py-14 lg:py-16 px-3 sm:px-4 md:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-xs lg:text-sm 2xl:text-base text-white mb-4 md:mb-0">
            © 2025 SkillBridge All Rights Reserved | Privacy Policy | Terms of Service | Cookie Policy | Site Map
          </p>
          <div className="flex gap-4">
            {[
              { icon: <Twitter size={18} />, href: "https://twitter.com" },
              { icon: <Linkedin size={18} />, href: "https://linkedin.com" },
              { icon: <Facebook size={18} />, href: "https://facebook.com" },
              { icon: <Instagram size={18} />, href: "https://instagram.com" },
              { icon: <Youtube size={18} />, href: "https://youtube.com" },
            ].map((social, index) => (
              <motion.div key={index} whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                <Link href={social.href} className="text-blue-100 hover:text-white transition-colors duration-300">
                  {social.icon}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
