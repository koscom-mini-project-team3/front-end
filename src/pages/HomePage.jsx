import { Header } from "../components/header/header"
import { HomeBanner } from "../components/home-banner"
import { CardGrid } from "../components/card-grid"

const monthlyCards = [
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202025-02-02%2018.22.03-NYH5IwehHMwInBEkWgA1uMXGfErOvo.png",
    name: "LOCA LIKIT 1.2",
    category: "롯데카드",
  },
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202025-02-02%2018.22.03-NYH5IwehHMwInBEkWgA1uMXGfErOvo.png",
    name: "신한카드 Mr.Life",
    category: "신한카드",
  },
]

const diningCards = [
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202025-02-02%2018.22.03-NYH5IwehHMwInBEkWgA1uMXGfErOvo.png",
    name: "KB국민 My WE·SH 카드",
    category: "KB국민카드",
  },
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202025-02-02%2018.22.03-NYH5IwehHMwInBEkWgA1uMXGfErOvo.png",
    name: "LOCA 365카드",
    category: "롯데카드",
  },
]

function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HomeBanner />
    </main>
  )
}

export default HomePage; 