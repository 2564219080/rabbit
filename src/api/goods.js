import request from '@/utils/request'

export const findGoods = id => request('/goods', 'get', { id })

export const findCommentInfoByGoods = id => {
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}

export const findCommentListByGoods = (id, data) => {
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', data)
}

export const findHotGoods = ({ id, type, limit = 3 }) => {
  return request('/goods/hot', 'get', { id, type, limit })
}
