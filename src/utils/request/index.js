import axios  from "axios";
import { ElMessage } from 'element-plus'
import {BASE_API} from '/config/dev.env.js'

const service = axios.create({
    baseURL: BASE_API,
    timeout: 10000
  })
export default service