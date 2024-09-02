import request from '@/utils/request'
// 获取所有的文章列表
export function account_info() {
    return request.get('/user/accountInfo')
}