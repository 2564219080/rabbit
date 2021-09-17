import request from '@/utils/request'

export const findTopCategory = id => {
  return request('/category', 'get', { id })
}

export const findSubCategoryFilter = id => request('/category/sub/filter', 'get', { id })

export const findSubCategoryGoods = data => {
  return request('/category/goods', 'post', data)
}
