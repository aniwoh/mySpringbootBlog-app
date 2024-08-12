import axios  from "axios";
import { ElMessage } from 'element-plus'
import {BASE_API} from '/config/dev.env.js'
import router from "@/utils/Route/index.js";

const service = axios.create({
    baseURL: BASE_API,
    timeout: 10000
  })

service.interceptors.response.use(
    response => response,
    error => {
        console.log(error.response.status)
        if (error.response.status === 401) {
            alert('Token过期，请重新登录');
            router.push('/login').then();  // 跳转到登录页面
        }
        return Promise.reject(error);
    }
);

service.interceptors.request.use(config => {
    // 在请求发送之前执行一些操作，例如添加 token
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    // 处理请求错误
    return Promise.reject(error);
});
export default service