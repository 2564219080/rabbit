import request from '@/utils/request'

export const findHeadCategory = () => {
  return request('/home/category/head', 'get')
}

export const findBanner = () => {
  return request('/home/banner', 'get')
}

export const findNew = () => {
  return request('/home/new', 'get')
}

export const findHot = () => {
  return request('/home/hot', 'get')
}

export const findGoods = () => {
  return request('/home/goods', 'get')
}
