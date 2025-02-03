import React from 'react';
import Header from '../components/header/header';
import DetailScreen from '../components/DetailScreen';
import ChatScreen from '../components/ChatScreen';

function DepositDetailPage() {
  const [selectedTagIds, setSelectedTagIds] = React.useState([]);
  const [selectedTagNames, setSelectedTagNames] = React.useState([]);

  return (
    <div className="h-screen">
      <Header activeTag="deposit" />
      <div className="bg-[#f8f9fa] flex h-[92%]">
        <div className="w-2/3 h-full">
          <DetailScreen selectedTagIds={selectedTagIds} setSelectedTagIds={setSelectedTagIds} selectedTagNames={selectedTagNames} setSelectedTagNames={setSelectedTagNames} />
        </div>
        <div className="w-1/3 h-full">
          <ChatScreen selectedTagIds={selectedTagIds} setSelectedTagIds={setSelectedTagIds} selectedTagNames={selectedTagNames} setSelectedTagNames={setSelectedTagNames} />
        </div>
      </div>
    </div>
  );
}

export default DepositDetailPage;
