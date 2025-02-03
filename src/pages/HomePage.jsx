import { Header } from "../components/header/header"
import { HomeBanner } from "../components/home-banner"
import { CardGrid } from "../components/card-grid"

const specialDeposits = [
  {
    id: 1,
    image:
      "/images/BK_SH_Profile.png",
    name: "Sh첫만남우대예금",
    company: "SH수협은행",
    maxInterestRate: "1.5",
    basicInterestRate: "0.5",
  },
  {
    id: 2,
    image:
      "/images/BK_SH_Profile.png",
    name: "(25년 새해출발) 특판 예금",
    company: "전북은행",
    maxInterestRate: "1.5",
    basicInterestRate: "0.5",
  },
  {
    id: 3,
    image:
      "/images/BK_BUSAN_Profile.png",
    name: "더(THE) 특판 정기예금",
    company: "부산은행",
    maxInterestRate: "1.5",
    basicInterestRate: "0.5",
  },
  {
    id: 4,
    image:
      "/images/BK_IBK_Profile.png",
    name: "처음 만나는 IBK중금채 (단기중금채)",
    company: "IBK기업은행",
    maxInterestRate: "1.5",
    basicInterestRate: "0.5",
  },
  {
    id: 5,
    image:
      "/images/BK_IBK_Profile.png",
    name: "처음 만나는 IBK중금채 (복리맞춤채권)",
    company: "IBK기업은행",
    maxInterestRate: "1.5",
    basicInterestRate: "0.5",
  },
  {
    id: 6,
    image:
      "/images/BK_JEONBUK_Profile.png",
    name: "KIA타이거즈 우승기뭔 예금",
    company: "광주은행",
    maxInterestRate: "1.5",
    basicInterestRate: "0.5",
  },
]

const aiETFs = [
  {
    id: 1,
    image:
      "/images/samsung-asset-logo.png",
    name: "KODEX 미국AI전력핵심인프라",
    company: "삼성자산운용",
    maxInterestRate: "1.92",
    basicInterestRate: "-11.42",
  },
  {
    id: 2,
    image:
      "/images/kiwoom-asset-logo.png",
    name: "KIWOOM 글로벌전력반도체",
    company: "키움투자자산운용",
    maxInterestRate: "0.44",
    basicInterestRate: "-1.99",
  },
]

function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HomeBanner />
      <CardGrid title="놓치지 마세요! 이달의 특판 예금" cards={specialDeposits} routeLink="/deposit" />
      <CardGrid title="Chat GPT로 열린 본격 인공지능의 시대! AI 관련 ETF" cards={aiETFs} />
    </main>
  )
}

export default HomePage; 