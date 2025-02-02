export function CardGrid({ title, cards }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <button className="text-sm text-gray-500">전체보기</button>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map((card, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-gray-100">
              <img
                src={card.image || "/placeholder.svg"}
                alt={card.name}
                className="h-full w-full object-contain p-4"
              />
            </div>
            <div className="mt-3 text-center">
              <h3 className="font-medium group-hover:text-blue-500">{card.name}</h3>
              <p className="text-sm text-gray-500">{card.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

