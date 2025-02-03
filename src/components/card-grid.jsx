import { useState } from "react"

export function CardGrid({ title, cards, routeLink }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-xl font-bold">{title}</h2>
        <button onClick={() => window.location.href = routeLink} className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">전체보기</button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className="p-4 border border-gray-200 rounded-lg bg-white relative transition-all duration-200 hover:border-gray-400 hover:shadow-lg cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center">
                  <h3 className="font-medium">
                    {card.name}
                    {card.badge && <span className="ml-1 text-xs text-red-500 align-top">{card.badge}</span>}
                  </h3>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{card.company}</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-end justify-end mt-2">
                <div className="text-sm text-green-500">최고</div>
                <div className="text-lg font-bold text-green-500 ml-1">{card.maxInterestRate}</div>
                <div className="text-lg text-green-500">%</div>
              </div>
              <div className="flex items-end justify-end">
                <div className="text-xs text-gray-400">기본</div>
                <div className="text-xs text-gray-400 ml-1">{card.basicInterestRate}</div>
                <div className="text-xs text-gray-400">%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

