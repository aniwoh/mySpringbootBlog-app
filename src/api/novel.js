import request from '@/utils/request'

export function getAllNovel() {
    return request.get('/novel/list')
}

export function getChapterProcessing(id){
    return request.get(`/novel/getChapterProcessing?id=${id}`)
}

export function getChapterList(id){
    return request.get(`/novel/getChapterList?id=${id}`)
}

export function getChapter(id){
    return request.get(`/novel/getChapter?id=${id}`)
}