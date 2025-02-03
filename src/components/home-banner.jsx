"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export function HomeBanner() {
  const [activeSlide, setActiveSlide] = useState(0)
  const totalSlides = 4

  const bannerImages = [
    "/images/banner-ads-1.png",
    "/images/banner-ads-2.png",
    "/images/banner-ads-3.jpg",
    "/images/banner-ads-4.png",
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
                  className="h-60 w-full p-5 object-contain flex-shrink-0"
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

