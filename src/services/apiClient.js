import axios from 'axios';
import { SERVER_DOMAIN } from '../config/constants';

// 서버 도메인을 기본 URL로 사용하여 axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: SERVER_DOMAIN,
});

export default apiClient; 