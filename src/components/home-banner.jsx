"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export function HomeBanner() {
  const [activeSlide, setActiveSlide] = useState(0)
  const totalSlides = 4

  const bannerImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202025-02-02%2018.22.03-NYH5IwehHMwInBEkWgA1uMXGfErOvo.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7vH9zaVkl7kx-SP_DT1el4gtxEPqo4UfjMg&s",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202025-02-02%2018.22.03-NYH5IwehHMwInBEkWgA1uMXGfErOvo.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7vH9zaVkl7kx-SP_DT1el4gtxEPqo4UfjMg&s",
  ]

  return (
    <div className="relative bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative flex items-center justify-between py-8 overflow-hidden">
          <button
            onClick={() => setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))}
            className="absolute left-0 z-10 rounded-full bg-white p-2 shadow-lg"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="w-full h-60 relative">
            <div
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {bannerImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Banner Ad ${index + 1}`}
                  className="h-60 w-full object-contain flex-shrink-0"
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))}
            className="absolute right-0 z-10 rounded-full bg-white p-2 shadow-lg"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="flex justify-center space-x-2 pb-4">
          {[...Array(totalSlides)].map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`h-2 w-2 rounded-full ${i === activeSlide ? "bg-orange-500" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

