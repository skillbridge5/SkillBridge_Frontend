"use client"

import { successMetrics } from "@/data/success-metrics"
import { motion } from "framer-motion"
import { CountUp } from "@/components/ui/count-up"

export function SuccessSection() {
  // Process the metrics to extract numeric values and suffixes
  const processedMetrics = successMetrics.map((metric) => {
    const value = metric.value
    let numericValue = ""
    let suffix = ""

    // Extract numeric part and suffix (like K+, %, etc.)
    if (typeof value === "string") {
      const match = value.match(/^(\d+)(.*)$/)
      if (match) {
        numericValue = match[1]
        suffix = match[2]
      }
    }

    return {
      ...metric,
      numericValue: numericValue || value,
      suffix,
    }
  })

  return (
    <section className="py-16 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-[#2396F3] mb-12"
        >
          Our Success
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {processedMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <CountUp
                end={metric.numericValue}
                suffix={metric.suffix}
                duration={2.5}
                className={`text-5xl xl:text-6xl font-bold text-[#F57C00] ${metric.color} mb-2`}
              />
              <p className="text-[#2396F3] dark:text-[#2396F3]/80 text-xl tracking-wide font-semibold">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
