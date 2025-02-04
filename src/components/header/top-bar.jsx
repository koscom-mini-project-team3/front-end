import { Search } from "lucide-react"

export default function TopBar() {
  return (
    <>
      {/* 로고 */}
      <div className="flex items-center justify-between py-1 sm:py-2 px-2 sm:px-6">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <a href="/" className="flex justify-center space-x-1 sm:space-x-2">
            <img
              src="/images/koscom-logo.png"
              alt="Card icon"
              className="h-4 sm:h-5 lg:h-6"
            />
            <div className="h-4 sm:h-5 lg:h-6 w-px bg-gray-300 mx-1 sm:mx-2"></div>
            <span className="text-sm sm:text-base lg:text-lg font-bold text-[#474545]">Team 3</span>
          </a>
        </div>

        {/* 검색바 */}
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="상품을 검색해보세요"
              className="w-[180px] sm:w-[250px] lg:w-[400px] rounded-full bg-gray-100 py-1 sm:py-1.5 lg:py-2 pl-2 sm:pl-3 lg:pl-4 pr-6 sm:pr-8 lg:pr-10 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <button className="absolute right-2 sm:right-2 lg:right-3 top-1/2 -translate-y-1/2">
              <Search className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* 상단 배너 광고 */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <div>
            <div className="text-[10px] sm:text-xs lg:text-sm font-bold">
              Kodex 미국A전력핵심인프라
            </div>
            <div className="text-[8px] sm:text-[9px] lg:text-[10px]">
              AI시대의 발전, 전력과 인프라에 달렸다.
            </div>
          </div>
          <img src="/images/samsung-asset-logo.png" alt="Kodex logo" className="h-5 sm:h-6 lg:h-7.5" />
        </div>
      </div>
    </>
  );
}
