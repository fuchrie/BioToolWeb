import axios from 'axios';
import { isJWTExpired } from './jwt';
import router from '@/router'; // 引入 Vue Router

const instance = axios.create({
    baseURL: 'http://202.195.187.9:8000', // 你的 API 地址
});

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            if (isJWTExpired(token)) {
                // 如果 JWT 过期，跳转到登录页面
                localStorage.removeItem('token'); // 清除过期令牌
                router.push('/login');
                return Promise.reject(new Error('Token expired'));
            }
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // 如果后端返回 401（未授权），跳转到登录页面
            localStorage.removeItem('token'); // 清除过期令牌
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

export default instance;