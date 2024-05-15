import request from '@/utils/request'
// 获取所有的文章列表
export function getAllArticle() {
    return request.get('/article/list')

}

export function getAllTags() {
    return request.get('/article/tags')
}