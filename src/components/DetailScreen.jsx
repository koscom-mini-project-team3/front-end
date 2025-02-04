import React from 'react';
import { MessageCirclePlusIcon } from "lucide-react"
import axios from 'axios';
import { SERVER_DOMAIN } from '../config/constants';

const DetailScreen = ({ selectedTagIds, setSelectedTagIds, setSelectedTagNames, selectedTagNames }) => {
    const [product, setProduct] = React.useState();
    const productId = window.location.pathname.split('/').pop(); // URL에서 productId 추출

    React.useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${SERVER_DOMAIN}/deposits/${productId}`);
            console.log(response.data);
            setProduct(response.data);

        } catch (error) {
            console.error('상품 데이터를 불러오는데 실패했습니다:', error);
        }
    };


    return (
        <main className="mx-auto max-w-[1200px] px-4 py-8 overflow-y-auto max-h-[calc(100vh-100px)] ">

            {/* Product Title */}
            <div className="space-y-6">
                {product ? (
                    <div key={product.id} className="rounded-lg border border-gray-200 bg-white p-6">
                        <div className="flex items-center gap-4">
                            <div className="h-20 w-20 rounded-full border border-gray-200 overflow-hidden flex items-center justify-center">
                                <img
                                    src={product.imageUrl || "/images/default-bank.png"}
                                    alt={`${product.bankName} 로고`}
                                    className="h-20 w-20 object-contain"
                                />
                            </div>

                            <div className="ml-8">
                                <div>
                                    <h3 className="text-2xl font-bold">{product.productName}</h3>
                                    <p className="text-base text-gray-600">{product.bankName}</p>
                                    {product.isSpecial && (
                                        <span className="mt-1 inline-block rounded bg-[#eef1ff] px-2 py-0.5 text-sm font-medium text-[#4263eb]">
                                            특판
                                        </span>
                                    )}
                                </div>
                                <div className="mt-2">
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm text-[#ff4013]">최고</span>
                                        <span className="text-lg font-bold text-[#ff4013]">{product.maxInterestRate}%</span>
                                    </div>
                                    <div className="text-sm text-gray-500">기본 {product.baseInterestRate}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-lg border border-gray-200 bg-white p-6 h-[160px]">
                        <div className="flex items-center gap-4">
                            <div className="h-20 w-20 rounded-full bg-gray-200 animate-pulse"></div>
                            <div className="ml-8 flex-1">
                                <div className="space-y-1">
                                    <div className="h-7 bg-gray-200 rounded animate-pulse w-3/4"></div>
                                    <div className="h-5 bg-gray-200 rounded animate-pulse w-1/4"></div>
                                </div>
                                <div className="mt-4 space-y-1">
                                    <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3"></div>
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Product description */}
            <div className="space-y-10 mt-5">
                {product && (
                    <div className="rounded-lg border border-gray-200 bg-white p-6">
                        <div className="space-y-10">
                            <div>
                                <h4 className="text-2xl font-bold mb-4">상품 기본 정보</h4>
                                <div className="space-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">은행명</span>
                                        <span className="text-gray-800">{product.bankName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">상품명</span>
                                        <span className="text-gray-800">{product.productName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">특판여부</span>
                                        <span className="text-gray-800">{product.special ? "특판상품" : "일반상품"}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold mb-4">가입 정보</h4>
                                <div className="space-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">계약기간</span>
                                        <span className="text-gray-800">{product.minContractPeriod}개월 ~ {product.maxContractPeriod}개월</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">최소 가입금액</span>
                                        <span className="text-gray-800">{product.minDepositLimit.toLocaleString()}원</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">가입대상</span>
                                        <span className="text-gray-800">{product.eligibleCustomers}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">가입방법</span>
                                        <span className="text-gray-800">{product.subscriptionMethod}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold mb-4">금리 정보</h4>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full border border-gray-100">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="text-left py-2 px-4 text-gray-600 border border-gray-100">구분</th>
                                                <th className="text-right py-2 px-4 text-gray-600 border border-gray-100">금리</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="py-2 px-4 text-gray-600 border border-gray-100">기본 금리</td>
                                                <td className="text-right py-2 px-4 border border-gray-100 text-gray-800">{product.baseInterestRate}%</td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 px-4 text-gray-600 border border-gray-100">최고 금리</td>
                                                <td className="text-right py-2 px-4 border border-gray-100 text-gray-800">{product.maxInterestRate}%</td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 px-4 text-gray-600 border border-gray-100">6개월 금리</td>
                                                <td className="text-right py-2 px-4 border border-gray-100 text-gray-800">{product.sixMonthInterestRate}%</td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 px-4 text-gray-600 border border-gray-100">12개월 금리</td>
                                                <td className="text-right py-2 px-4 border border-gray-100 text-gray-800">{product.twelveMonthInterestRate}%</td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 px-4 text-gray-600 border border-gray-100">24개월 금리</td>
                                                <td className="text-right py-2 px-4 border border-gray-100 text-gray-800">{product.twentyFourMonthInterestRate}%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold mb-4">상품 특징</h4>
                                <div className="space-y-1">
                                    <div className="flex flex-col">
                                        <span className="text-gray-600 mb-2">특별조건</span>
                                        <div className="flex flex-wrap gap-2">
                                            {product.specialConditions.split(',').map((condition, index) => (
                                                <span key={index} className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full whitespace-nowrap text-sm">
                                                    {condition.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-600">만기 후 이자</span>
                                        <div className="flex">
                                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full whitespace-nowrap text-sm">
                                                {product.maturityInterest.trim()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Product Document */}
            <div className="space-y-6 mt-6">
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                    {/* 헤더 */}
                    <div className="flex justify-between">
                        <h4 className="text-2xl font-bold mb-4">상품 설명서</h4>

                        {/* 비교 대상 추가 버튼 */}
                        <div className="flex gap-2">
                            <button
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff2eb] text-[#ff4013] hover:bg-[#ffe4d6] transition-all hover:scale-110 active:scale-90"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!selectedTagIds.includes(product.id)) {
                                        setSelectedTagIds([...selectedTagIds, product.id]);
                                        setSelectedTagNames([...selectedTagNames, product.productName]);
                                    }
                                }}
                            >
                                <MessageCirclePlusIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    {product && (
                        <div className="w-full h-[800px]">
                            <iframe
                                src={product.pdfUrl}
                                title="상품 설명서"
                                className="w-full h-full border-0"
                            />
                        </div>
                    )}
                </div>

            </div>
        </main >
    );
};

export default DetailScreen;