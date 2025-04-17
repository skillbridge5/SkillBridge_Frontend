"use client"
import { testimonials } from "@/data/testimonials"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Quote } from "lucide-react"
import { imagePaths } from "../data/image-paths"

export function TestimonialsSection() {
  return (
    <section className="py-16 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 dark:text-white"
        >
          Testimonials
        </motion.h2>

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 p-1">
                  <Card className={`${testimonial.bgColor} border-none h-full`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <Avatar className="w-20 h-20 mb-4">
                          <AvatarImage
                            src={testimonial.image || imagePaths.placeholders.avatar}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-bold text-lg mb-1 dark:text-white">{testimonial.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{testimonial.title}</p>
                        <div className="relative">
                          <Quote className="absolute -top-2 -left-2 w-6 h-6 text-blue-300 opacity-40" />
                          <p className="text-gray-700 dark:text-gray-300 italic relative z-10">
                            "{testimonial.testimonial}"
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="relative static left-0 right-auto translate-y-0 mr-2" />
              <CarouselNext className="relative static right-0 left-auto translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
