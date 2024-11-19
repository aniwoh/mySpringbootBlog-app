import axios  from "axios";

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_Url,
    timeout: 10000
  })

service.interceptors.request.use(config => {
    // 在请求发送之前执行一些操作，例如添加 token
    config.withCredentials= true;
    return config;
}, error => {
    // 处理请求错误
    return Promise.reject(error);
});
export default service