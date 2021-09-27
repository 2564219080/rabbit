import request from '@/utils/request'

export const findCheckoutInfo = () => {
  return request('/member/order/pre', 'get')
}

export const addAddress = (address) => {
  return request('/member/address', 'post', address)
}

export const createOrder = (order) => {
  return request('/member/order', 'post', order)
}
