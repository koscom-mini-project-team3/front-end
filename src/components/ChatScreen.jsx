import React from 'react';
import { Send, X, MoreVertical, Trash2 } from "lucide-react";
import { SERVER_DOMAIN } from "../config/constants";

const ChatScreen = ({ selectedTagIds, setSelectedTagIds, selectedTagNames, setSelectedTagNames }) => {

    const [messages, setMessages] = React.useState([
    ]);
    const [messageInput, setMessageInput] = React.useState('');
    const [showMenu, setShowMenu] = React.useState(false);
    const messagesEndRef = React.useRef(null);
    const messagesPanelRef = React.useRef(null);

    const scrollToBottom = () => {
        if (messagesPanelRef.current) {
            messagesPanelRef.current.scrollTop = messagesPanelRef.current.scrollHeight;
        }
    };

    React.useEffect(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const streamGptResponse = async (question) => {
        // AI 응답 메시지 추가 (초기값 빈 문자열)
        setMessages(prev => [...prev, { type: 'ai', content: '' }]);
        try {
            const response = await fetch(`${SERVER_DOMAIN}/gpt/ask-stream`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: question, ids: selectedTagIds })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let done = false;
            let aiAnswer = '';
            let buffer = '';

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                if (value) {
                    const chunk = decoder.decode(value, { stream: true });
                    buffer += chunk;
                    // console.log(chunk);

                    // 여러 줄 처리
                    const lines = buffer.split('\n');
                    let processedLength = 0;

                    for (const line of lines) {
                        // data: 프리픽스 제거
                        const answer = line.replace(/^data:/, '');

                        if (answer === '[DONE]') {
                            processedLength += line.length + 1;
                            continue;
                        }

                        aiAnswer += answer;
                        // 개행 및 마크다운 볼드 처리
                        // aiAnswer = aiAnswer.replace(/\*\*(.*?)\*\*/g, '<br><br><b>$1</b>');

                        setMessages(prev => {
                            const newMessages = [...prev];
                            newMessages[newMessages.length - 1] = { type: 'ai', content: aiAnswer };
                            localStorage.setItem('chatMessages', JSON.stringify(newMessages));
                            return newMessages;
                        });

                        processedLength += line.length + 1;
                    }

                    buffer = buffer.slice(processedLength);
                }
            }

        } catch (error) {
            console.error('Error streaming GPT answer:', error);
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { type: 'ai', content: 'Error: GPT 답변 스트리밍 실패' };
                return newMessages;
            });

            try {
                const storedMessages = localStorage.getItem('chatMessages');
                if (storedMessages) {
                    const messagesArray = JSON.parse(storedMessages);
                    if (messagesArray.length > 0) {
                        const lastMessage = messagesArray[messagesArray.length - 1];
                        if (lastMessage.type === 'ai') {
                            // AI 메시지가 마지막이면 그 전 user 메시지도 함께 삭제
                            messagesArray.splice(messagesArray.length - 2, 2);
                        } else if (lastMessage.type === 'user') {
                            // User 메시지가 마지막이면 해당 메시지만 삭제
                            messagesArray.pop();
                        }
                        localStorage.setItem('chatMessages', JSON.stringify(messagesArray));
                    }
                }
            } catch (err) {
                console.error('localStorage에서 마지막 user 메시지 삭제 중 에러:', err);
            }
        }
    };

    // 메시지 전송 함수
    const sendMessage = async () => {
        if (messageInput.trim() === '') return;

        const formattedMessage = messageInput.trim().split('\n').join(' ');
        const updatedMessages = [...messages, { type: 'user', content: formattedMessage }];
        setMessages(updatedMessages);
        localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
        setMessageInput('');

        await streamGptResponse(formattedMessage);
    };

    return (
        <aside className="w-full border-l border-gray-200 bg-white flex flex-col h-full">
            {/* 상단 옵션 버튼 */}
            <div className="relative flex justify-end px-4 py-2 mb-4">
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                >
                    <MoreVertical className="h-6 w-6 text-gray-600" />
                </button>
                {showMenu && (
                    <div className="absolute top-full right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1">
                            <button
                                onClick={() => {
                                    localStorage.removeItem('chatMessages');
                                    setMessages([]);
                                    setShowMenu(false);
                                }}
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
            <div className="flex-1 overflow-hidden scrollbar-hide">
                <div className="h-full space-y-6 overflow-y-auto px-6 scrollbar-hide" ref={messagesPanelRef}>
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
                                    {/* 2024.02.04 원문 적용 제거 */}
                                    {/* <h4 className="font-medium text-sm text-left">
                                        {message.content}
                                    </h4> */}
                                    <h4 className="font-medium text-sm text-left"
                                        dangerouslySetInnerHTML={{
                                            // 2024.02.04 임의로 가독성 향상 제거
                                            // __html: message.content.replace(/^(<br>)+|(<br>){2,}/g, '').replace(/<br>/g, '<br><br>')
                                            __html: message.content
                                        }}>
                                    </h4>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>

            {/* 메시지 입력창 */}
            < div className="mt-auto" >
                <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-1">
                        {/* 질문 대상 태그 */}
                        {selectedTagIds.map((id, index) => (
                            id && (
                                <span key={id} className="inline-flex items-center rounded bg-[#fff2eb] px-3 py-2 ml-4 mt-2 text-base text-[#ff4013]">
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

                    {/* 질문 입력 */}
                    <textarea
                        placeholder="메시지를 입력하세요."
                        className="w-auto rounded-lg border border-gray-200 bg-gray-100 px-4 py-4 mx-4 mb-4 text-base focus:border-gray-300 focus:outline-none resize-none overflow-y-auto"
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
                                } else {
                                    setMessageInput('');
                                }
                            }
                        }}
                    />
                    <div className="relative">
                        <button
                            className="absolute bottom-8 right-6 p-3 bg-[#E5571B] text-white rounded-full hover:bg-[#d14d17]"
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