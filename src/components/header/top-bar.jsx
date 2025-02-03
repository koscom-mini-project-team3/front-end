import { Search } from "lucide-react"

export default function TopBar() {
  return (
    <>
      {/* 로고 */}
      <div className="flex items-center justify-between py-2 px-6">
        <div className="flex items-center space-x-2">
          <a href="/" className="flex justify-center space-x-2">
            <img
              src="/images/koscom-logo.png"
              alt="Card icon"
              className="h-6"
            />
            <div className="h-6 w-px bg-gray-300 mx-2"></div>
            <span className="text-lg font-bold text-[#474545]">Team 3</span>
          </a>
        </div>

        {/* 검색바 */}
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="상품을 검색해보세요"
              className="w-[400px] rounded-full bg-gray-100 py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>


        {/* 상단 배너 광고 */}
        <div className="flex items-center space-x-2">
          <div>
            <div className="text-sm font-bold">
              Kodex 미국A전력핵심인프라
            </div>
            <div className="text-[10px]">
              AI시대의 발전, 전력과 인프라에 달렸다.
            </div>
          </div>
          <img src="/images/samsung-asset-logo.png" alt="Kodex logo" className="h-7.5" />
        </div>
      </div>
    </>
  );
}
