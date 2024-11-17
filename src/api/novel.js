import request from '@/utils/request'

export function getAllNovel() {
    return request.get('/novel/list')
}