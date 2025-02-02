"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export function HomeBanner() {
  const [activeSlide, setActiveSlide] = useState(0)
  const totalSlides = 6

  return (
    <div className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative flex items-center justify-between py-8">
          <button
            onClick={() => setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))}
            className="absolute left-0 z-10 rounded-full bg-white p-2 shadow-lg"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="mx-auto flex items-center justify-center">
            <div className="relative h-[200px] w-[600px]">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202025-02-02%2018.22.03-NYH5IwehHMwInBEkWgA1uMXGfErOvo.png"
                alt="Credit cards"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="ml-8">
              <div className="text-orange-500">2월 환전 캐시백 이벤트</div>
              <h2 className="mt-2 text-3xl font-bold">
                총 86종
                <br />
                최대 30만원 캐시백
              </h2>
              <p className="mt-4 text-gray-600">
                8대 카드사 모두 진행 중!
                <br />
                연회비까지 받아가세요
              </p>
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

