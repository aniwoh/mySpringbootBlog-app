import request from '@/utils/request'
// 获取所有的文章列表
export async function getAllArticleService() {
    return await request.get('/article/list')
}