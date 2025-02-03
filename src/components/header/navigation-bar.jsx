import React from 'react';

export function NavigationBar({ activeTag }) {
    return (
        <nav className="border-t border-gray-200 flex items-center justify-between">
            <div className="flex justify-center w-full">
                <a href="/deposit" className={`flex items-center px-5.5 py-3.5 hover:bg-gray-100 cursor-pointer ${activeTag === 'deposit' ? 'text-[#E5571B]' : ''}`}>
                    예금
                </a>
                <a href="#" className={`flex items-center px-5.5 py-3.5 hover:bg-gray-100 cursor-pointer ${activeTag === 'savings' ? 'text-[#E5571B]' : ''}`}>
                    적금
                </a>
                <a href="#" className={`flex items-center px-5.5 py-3.5 hover:bg-gray-100 cursor-pointer ${activeTag === 'etf' ? 'text-[#E5571B]' : ''}`}>
                    ETF
                </a>
                <a href="#" className={`flex items-center px-5.5 py-3.5 hover:bg-gray-100 cursor-pointer ${activeTag === 'bond' ? 'text-[#E5571B]' : ''}`}>
                    채권
                </a>
                <a href="#" className={`flex items-center px-5.5 py-3.5 hover:bg-gray-100 cursor-pointer ${activeTag === 'premium' ? 'text-[#E5571B]' : ''}`}>
                    프리미엄 제휴상품
                </a>
            </div>
        </nav>
    );
}

export default NavigationBar;