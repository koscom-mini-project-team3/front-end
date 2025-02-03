import React from 'react';
import { MessageCircle, Star } from "lucide-react";

const ProductScreen = ({ products, selectedTagIds, setSelectedTagIds, setSelectedTagNames, selectedTagNames }) => {
    const [selectedPeriod, setSelectedPeriod] = React.useState('all');
    const [selectedAmount, setSelectedAmount] = React.useState('');
    const [selectedSort, setSelectedSort] = React.useState('baseRateDesc');

    return (
        <main className="mx-auto max-w-[1200px] px-4 py-8">
            {/* Filters */}
            <div className="mb-6 flex items-center justify-between bg-white py-4 px-6 rounded-lg border border-gray-200 ">
                <div className="flex items-center gap-4">
                    {/* 가입기간 */}
                    <span className="text-sm text-gray-600">가입기간</span>
                    <div className="inline-flex rounded-lg bg-white p-1">
                        <button
                            className={`rounded-md px-4 py-2 text-sm font-medium transition-all hover:scale-105 active:scale-95 ${selectedPeriod === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100'}`}
                            onClick={() => setSelectedPeriod('all')}
                        >전체</button>
                        <button
                            className={`rounded-md px-4 py-2 text-sm font-medium transition-all hover:scale-105 active:scale-95 ${selectedPeriod === '6month' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100'}`}
                            onClick={() => setSelectedPeriod('6month')}
                        >6개월</button>
                        <button
                            className={`rounded-md px-4 py-2 text-sm font-medium transition-all hover:scale-105 active:scale-95 ${selectedPeriod === '12month' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100'}`}
                            onClick={() => setSelectedPeriod('12month')}
                        >12개월</button>
                        <button
                            className={`rounded-md px-4 py-2 text-sm font-medium transition-all hover:scale-105 active:scale-95 ${selectedPeriod === '24month' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100'}`}
                            onClick={() => setSelectedPeriod('24month')}
                        >24개월</button>
                    </div>

                    {/* 가입금액 */}
                    <span className="ml-2 text-sm text-gray-600">가입금액</span>
                    <input
                        type="text"
                        placeholder="금액을 입력해주세요"
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        value={selectedAmount}
                        onChange={(e) => setSelectedAmount(e.target.value)}
                    />
                </div>

                {/* 정렬기준 */}
                <div className="relative">
                    <select
                        className="h-10 rounded-lg border border-gray-300 bg-white pl-3 pr-10 text-sm"
                        value={selectedSort}
                        onChange={(e) => setSelectedSort(e.target.value)}
                    >
                        <option value="baseRateDesc">기본금리높은순</option>
                        <option value="maxRateDesc">최고금리높은순</option>
                    </select>
                </div>
            </div>

            {/* Product List */}
            <div className="space-y-4">
                {products.map((product) => (
                    <div key={product.id} className="rounded-lg border border-gray-200 bg-white p-6 hover:border-gray-400 cursor-pointer">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {/* 비교 대상 추가 버튼 */}
                                <div className="flex gap-2">
                                    <button
                                        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff2eb] text-[#ff4013] hover:bg-[#ffe4d6] transition-all hover:scale-110 active:scale-90"
                                        onClick={() => {
                                            if (!selectedTagIds.includes(product.id)) {
                                                setSelectedTagIds([...selectedTagIds, product.id]);
                                                setSelectedTagNames([...selectedTagNames, product.name]);
                                            }
                                        }}
                                    >
                                        <MessageCircle className="h-6 w-6" />
                                    </button>
                                </div>

                                <div className="h-11 w-11 rounded-full border border-gray-200 overflow-hidden flex items-center justify-center">
                                    <img
                                        src={product.image || "/images/default-bank.png"}
                                        alt={`${product.company} 로고`}
                                        className="h-11 w-11 object-contain"
                                    />
                                </div>


                                <div>
                                    <h3 className="font-medium">{product.name}</h3>
                                    <p className="text-sm text-gray-600">{product.company}</p>
                                    {product.isSpecial && (
                                        <span className="mt-1 inline-block rounded bg-[#eef1ff] px-2 py-0.5 text-xs font-medium text-[#4263eb]">
                                            특판
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                    <span className="text-sm text-[#ff4013]">최고</span>
                                    <span className="text-lg font-bold text-[#ff4013]">{product.maxRate}%</span>
                                </div>
                                <div className="text-sm text-gray-500">기본 {product.baseRate}%</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main >
    );
};

export default ProductScreen;