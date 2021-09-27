import request from '@/utils/request'

export const mergeLocalCart = (cartList) => {
  return request('/member/cart/merge', 'post', cartList)
}

export const findCartList = () => {
  return request('/member/cart', 'get')
}

export const insertCart = ({ skuId, count }) => {
  return request('/member/cart', 'post', { skuId, count })
}
export const delectCart = (ids) => {
  return request('/member/cart', 'delect', { ids })
}

export const updateCart = (goods) => {
  return request('/member/cart/' + goods.skuId, 'put', goods)
}

export const checkAllCart = ({ selected, ids }) => {
  return request('/member/cart/selected', 'put', { selected, ids })
}
