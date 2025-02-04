import React from 'react';
import { Send, X, MoreVertical, Trash2 } from "lucide-react";
import { SERVER_DOMAIN } from "../config/constants";

const ChatScreen = ({ selectedTagIds, setSelectedTagIds, selectedTagNames, setSelectedTagNames }) => {
    const [messages, setMessages] = React.useState([]);
    const [displayedMessages, setDisplayedMessages] = React.useState([]);
    const [messageInput, setMessageInput] = React.useState('');
    const [showMenu, setShowMenu] = React.useState(false);
    const messagesPanelRef = React.useRef(null);
    const MESSAGES_PER_PAGE = 6;

    const scrollToBottom = () => {
        if (messagesPanelRef.current) {
            messagesPanelRef.current.scrollTop = messagesPanelRef.current.scrollHeight;
        }
    };

    React.useEffect(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            const allMessages = JSON.parse(savedMessages);
            setMessages(allMessages);
            setDisplayedMessages(allMessages.slice(-MESSAGES_PER_PAGE));

            allMessages.forEach(message => {
                if (message.type === 'ai') {
                    // console.log(message.content.replace(/^(\s*<br>\s*)+/, '').replace(/(?<!<br>\s*)-/g, '<br>-').replace(/(?<=<br>\s*)<b>/g, '<b>').replace(/(?<=<\/b>)(\s*<br>\s*){2,}/g, '<br>'));
                }
            })
        }

    }, []);

    React.useEffect(() => {
        scrollToBottom();
    }, [displayedMessages]);

    const loadMoreMessages = () => {
        const currentLength = displayedMessages.length;
        const newMessages = messages.slice(
            Math.max(0, messages.length - (currentLength + MESSAGES_PER_PAGE)),
            messages.length - currentLength
        );
        setDisplayedMessages([...newMessages, ...displayedMessages]);
    };

    const streamGptResponse = async (question, previousChat) => {
        setMessages(prev => [...prev, { type: 'ai', content: '' }]);
        setDisplayedMessages(prev => [...prev, { type: 'ai', content: '' }]);
        try {
            const response = await fetch(`${SERVER_DOMAIN}/gpt/ask-stream`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: question, ids: selectedTagIds, previousChat: previousChat })
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

                    const lines = buffer.split('\n');
                    let processedLength = 0;

                    for (const line of lines) {
                        const answer = line.replace(/^data:/, '');

                        if (answer === '[DONE]') {
                            processedLength += line.length + 1;
                            continue;
                        }

                        aiAnswer += answer;

                        setMessages(prev => {
                            const newMessages = [...prev];
                            newMessages[newMessages.length - 1] = { type: 'ai', content: aiAnswer };
                            localStorage.setItem('chatMessages', JSON.stringify(newMessages));
                            return newMessages;
                        });

                        setDisplayedMessages(prev => {
                            const newMessages = [...prev];
                            newMessages[newMessages.length - 1] = { type: 'ai', content: aiAnswer };
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
            setDisplayedMessages(prev => {
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
                            messagesArray.splice(messagesArray.length - 2, 2);
                        } else if (lastMessage.type === 'user') {
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

    const sendMessage = async () => {
        if (messageInput.trim() === '') return;

        const previousMessages = messages.slice(-5).map(message => JSON.stringify({ type: message.type, content: message.content })).join('');
        const formattedMessage = messageInput.trim().split('\n').join(' ');
        const newMessage = { type: 'user', content: formattedMessage };

        setMessages(prev => [...prev, newMessage]);
        setDisplayedMessages(prev => {
            if (prev.length >= MESSAGES_PER_PAGE) {
                return [...prev.slice(1), newMessage];
            }
            return [...prev, newMessage];
        });

        localStorage.setItem('chatMessages', JSON.stringify([...messages, newMessage]));
        setMessageInput('');

        await streamGptResponse(formattedMessage, previousMessages);
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
                                    setDisplayedMessages([]);
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
            <div className="flex-1 overflow-hidden ">
                <div className="h-full space-y-6 overflow-y-auto px-6 " ref={messagesPanelRef}>
                    {messages.length > displayedMessages.length && (
                        <div className="flex items-center gap-4 px-2">
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <button
                                onClick={loadMoreMessages}
                                className="px-4 text-sm text-gray-600 hover:bg-gray-100 rounded-full whitespace-nowrap"
                            >
                                메시지 추가 로드
                            </button>
                            <div className="flex-1 h-px bg-gray-200"></div>
                        </div>
                    )}
                    {displayedMessages.map((message, index) => (
                        message.type === 'user' ? (
                            <div key={index} className="rounded-lg bg-[#f8f9fa] p-3 ml-auto w-fit max-w-[90%]">
                                <h4 className="font-medium text-sm text-right">{message.content}</h4>
                            </div>
                        ) : (
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
                                    <h4 className="font-medium text-sm text-left"
                                        dangerouslySetInnerHTML={{
                                            __html: message.content.replace(/(?<!(<br>\s*){2})<b>/g, '<br><b>').replace(/^(\s*<br>\s*)+/, '').replace(/(?<!<br>\s*)-/g, '<br>-').replace(/(?<=<\/b>)(\s*<br>\s*){2,}/g, '</b><br>')
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
                                e.stopPropagation();

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