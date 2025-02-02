import { ChevronDown, Search, ShoppingCart } from "lucide-react"

export function NavBar() {
  return (
    <div className="border-b">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top bar */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <span className="text-xl">8</span>
            <div className="flex items-center space-x-2 rounded-full bg-gray-100 px-3 py-1">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202025-02-02%2018.22.03-NYH5IwehHMwInBEkWgA1uMXGfErOvo.png"
                alt="Card icon"
                className="h-5 w-5 rounded"
              />
              <span className="text-sm">카드위젯석 EVERY MILE SKYPASS</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
          <a href="/" className="text-2xl font-bold">
            CARD GORILLA
          </a>
          <div className="flex items-center space-x-2">
            <div className="rounded bg-blue-500 p-2 text-xs text-white">
              최대 15만원 캐시백
              <br />
              현대카드M 2월 한정 이벤트
            </div>
            <span className="text-blue-500">M</span>
          </div>
        </div>

        {/* Navigation menu */}
        <nav className="flex items-center justify-between py-3">
          <div className="flex space-x-6">
            <a href="#" className="flex items-center space-x-1">
              고릴라차트
              <ChevronDown className="h-4 w-4" />
            </a>
            <a href="#" className="flex items-center space-x-1">
              카드
              <ChevronDown className="h-4 w-4" />
            </a>
            <a href="#">카드사</a>
            <a href="#" className="flex items-center">
              캐시백
              <span className="ml-1 inline-block rounded-full bg-yellow-400 px-1 text-xs">😊</span>
            </a>
            <a href="#" className="flex items-center space-x-1">
              콘텐츠
              <ChevronDown className="h-4 w-4" />
            </a>
            <a href="#">프리미엄</a>
            <a href="#">마일리지</a>
            <a href="#" className="flex items-center space-x-1">
              호텔
              <ChevronDown className="h-4 w-4" />
            </a>
            <a href="#" className="flex items-center space-x-1">
              카드커버
              <ChevronDown className="h-4 w-4" />
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Search className="h-5 w-5" />
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
                0
              </span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

