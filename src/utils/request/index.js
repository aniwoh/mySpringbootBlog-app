import axios  from "axios";
import { ElMessage } from 'element-plus'
import {BASE_API} from '/config/dev.env.js'

const service = axios.create({
    baseURL: BASE_API,
    timeout: 10000
  })

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