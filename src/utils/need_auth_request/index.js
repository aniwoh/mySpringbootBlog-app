import axios  from "axios";
import router from "@/utils/Route/index.js";

let isAlertShown = false;

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_Url,
    timeout: 10000
})

service.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            if (!isAlertShown) {
                isAlertShown = true;
                alert('Token过期，请重新登录');
                router.push('/login').then(() => {
                    isAlertShown = false; // Reset the flag after the navigation is done
                });
            }
        }
        return Promise.reject(error);
    }
);

service.interceptors.request.use(config => {
    // 在请求发送之前执行一些操作，例如添加 token
    config.withCredentials= true;
    return config;
}, error => {
    // 处理请求错误
    return Promise.reject(error);
});
export default service