import React from 'react';
import Header from '../components/header/header';
import ProductScreen from '../components/listPage/ProductScreen';
import ChatScreen from '../components/listPage/ChatScreen';

function DepositListPage() {

  const products = [
    {
      id: 1,
      image:
        "/images/BK_SH_Profile.png",
      name: "Sh첫만남우대예금",
      company: "SH수협은행",
      maxRate: "3.45",
      baseRate: "2.30",
      isSpecial: true,
    },
    {
      id: 2,
      image:
        "/images/BK_JEONBUK_Profile.png",
      name: "(25년 새해출발) 특판 예금",
      company: "전북은행",
      maxRate: "3.45",
      baseRate: "2.30",
      isSpecial: false,
    },
  ]

  const messages = [
    { type: 'user', content: '가장 이용이 많은 상품이 뭐야?' },
    { type: 'ai', content: 'iM주거래우대예금(첫만남고객형)이 가장 이용이 많은 상품이에요.' },
  ]

  const [selectedTagIds, setSelectedTagIds] = React.useState([]);
  const [selectedTagNames, setSelectedTagNames] = React.useState([]);

  return (
    <div className="h-screen">
      <Header activeTag="deposit" />
      <div className="bg-[#f8f9fa] flex h-[92%]">
        <div className="w-2/3 h-full">
          <ProductScreen products={products} selectedTagIds={selectedTagIds} setSelectedTagIds={setSelectedTagIds} setSelectedTagNames={setSelectedTagNames} selectedTagNames={selectedTagNames} />
        </div>
        <div className="w-1/3 h-full">
          <ChatScreen messages={messages} selectedTagIds={selectedTagIds} setSelectedTagIds={setSelectedTagIds} selectedTagNames={selectedTagNames} setSelectedTagNames={setSelectedTagNames} />
        </div>
      </div>
    </div>
  );
}

export default DepositListPage; 