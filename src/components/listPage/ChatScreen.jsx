import React from 'react';
import { Send, X, MoreVertical, Trash2 } from "lucide-react";

const ChatScreen = ({ selectedTagIds, setSelectedTagIds, selectedTagNames, setSelectedTagNames }) => {

    const [messages, setMessages] = React.useState([
        { type: 'user', content: '가장 이용이 많은 상품이 뭐야?' },
        { type: 'ai', content: 'iM주거래우대예금(첫만남고객형)이 가장 이용이 많은 상품이에요.' },
    ]);
    const [messageInput, setMessageInput] = React.useState('');
    const [showMenu, setShowMenu] = React.useState(false);

    React.useEffect(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    const sendMessage = () => {
        if (messageInput.trim() === '') return;

        const formattedMessage = messageInput.trim().split('\n').join(' ');
        const updatedMessages = [...messages, { type: 'user', content: formattedMessage }];
        setMessages(updatedMessages);
        localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));

        setMessageInput('');
    };

    const clearChatHistory = () => {
        localStorage.removeItem('chatMessages');
        setMessages([]);
        setShowMenu(false);
    };

    return (
        <aside className="w-full border-l border-gray-200 bg-white p-6 flex flex-col h-full">
            {/* 상단 옵션 버튼 */}
            <div className="relative flex justify-end mb-4">
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                >
                    <MoreVertical className="h-5 w-5 text-gray-600" />
                </button>
                {showMenu && (
                    <div className="absolute top-full right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1">
                            <button
                                onClick={clearChatHistory}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                대화 내역 삭제
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 메시지 목록 패널 */}
            <div className="space-y-6">
                {messages.map((message, index) => (
                    message.type === 'user' ? (
                        // 사용자 메시지
                        <div key={index} className="rounded-lg bg-[#f8f9fa] p-3 ml-auto w-fit max-w-[90%]">
                            <h4 className="font-medium text-sm text-right">{message.content}</h4>
                        </div>
                    ) : (
                        // AI 메시지
                        <div key={index} className="flex justify-end">
                            <div className="flex items-start">
                                <div className="h-11 w-11 rounded-full border border-gray-600 overflow-hidden flex items-center justify-center">
                                    <img
                                        src="/images/koscom-logo-profile.png"
                                        alt="AI Profile"
                                        className="h-5"
                                    />
                                </div>
                            </div>
                            <div className="mt-3 ml-2 mr-auto w-fit max-w-[90%]">
                                <h4 className="font-medium text-sm text-left">{message.content}</h4>
                            </div>
                        </div>
                    )
                ))}
            </div>

            {/* 메시지 입력창 */}
            <div className="mt-auto">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-1">
                        {selectedTagIds.map((id, index) => (
                            id && (
                                <span key={id} className="inline-flex items-center rounded bg-[#fff2eb] px-3 py-2 text-base text-[#ff4013] gap-2">
                                    #{selectedTagNames[index]}
                                    <div className="flex">
                                        <X
                                            className="h-5 w-5 cursor-pointer hover:opacity-75"
                                            onClick={() => {
                                                const newIds = selectedTagIds.filter((_, i) => i !== index);
                                                const newNames = selectedTagNames.filter((_, i) => i !== index);
                                                setSelectedTagIds(newIds);
                                                setSelectedTagNames(newNames);
                                            }}
                                        />
                                    </div>
                                </span>
                            )
                        ))}
                    </div>
                    <textarea
                        placeholder="메시지를 입력하세요."
                        className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-4 text-base focus:border-gray-300 focus:outline-none resize-none overflow-y-auto"
                        style={{ minHeight: '180px' }}
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                e.stopPropagation(); // Prevent event bubbling

                                // Debounce the sendMessage call
                                const now = Date.now();
                                if (!window.lastSendTime || now - window.lastSendTime > 100) {
                                    window.lastSendTime = now;
                                    sendMessage();
                                }
                            }
                        }}
                    />
                    <div className="relative">
                        <button
                            className="absolute bottom-6 right-6 p-3 bg-[#E5571B] text-white rounded-full hover:bg-[#d14d17]"
                            onClick={sendMessage}
                        >
                            <Send className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default ChatScreen;