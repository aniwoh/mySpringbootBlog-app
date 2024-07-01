import request from '@/utils/request'
// 获取所有的文章列表
export function getAllArticle() {
    return request.get('/article/list')

}

export function getAllTags() {
    return request.get('/article/tags')
}

export function getArticleById(id) {
    return request.get('/article/detail?id='+id)
}