import React from 'react';
import { MessageCircle } from "lucide-react"
import axios from 'axios';
import { SERVER_DOMAIN } from '../config/constants';

const DetailScreen = ({ selectedTagIds, setSelectedTagIds, setSelectedTagNames, selectedTagNames }) => {
    const [product, setProduct] = React.useState([]);
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
        <main className="mx-auto max-w-[1200px] px-4 py-8">

            {/* Product List */}
            <div className="space-y-4">
                {product.map((product) => (
                    <div key={product.id} className="rounded-lg border border-gray-200 bg-white p-6 hover:border-gray-400 cursor-pointer">
                        <div className="flex items-center justify-between" onClick={() => window.location.href = `/deposit/${product.id}`}>
                            <div className="flex items-center gap-4">
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
                                        <MessageCircle className="h-6 w-6" />
                                    </button>
                                </div>

                                <div className="h-11 w-11 rounded-full border border-gray-200 overflow-hidden flex items-center justify-center">
                                    <img
                                        src={product.imageUrl || "/images/default-bank.png"}
                                        alt={`${product.bankName} 로고`}
                                        className="h-11 w-11 object-contain"
                                    />
                                </div>


                                <div>
                                    <h3 className="font-medium">{product.productName}</h3>
                                    <p className="text-sm text-gray-600">{product.bankName}</p>
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
                                    <span className="text-lg font-bold text-[#ff4013]">{product.maxInterestRate}%</span>
                                </div>
                                <div className="text-sm text-gray-500">기본 {product.baseInterestRate}%</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main >
    );
};

export default DetailScreen;