import axios  from "axios";
import { ElMessage } from 'element-plus'
import {BASE_API} from '/config/dev.env.js'

const service = axios.create({
    baseURL: BASE_API,
    timeout: 10000
  })
service.interceptors.response.use(
  response => {
      const result = response.data;
      if (result.code !== 0) {
          return Promise.reject(result.message || 'Error')
      } else {
          return result.data;
      }
  },
  error => {
      ElMessage({
          type: 'warning',
          showClose: true,
          message: '连接超时'
        })
        return Promise.reject(error)
  }
)
export default service