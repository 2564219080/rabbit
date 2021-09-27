import request from '@/utils/request'

export const userAccountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}

export const userQQLogin = (unionId, source = 6) => {
  return request('https://pcapi-xiaotuxian-front-devtest.itheima.net/login/social', 'post', { unionId, source })
}

export const userQQBindLogin = ({ unionId, mobile, code }) => {
  return request('/login/social/bind', 'post', { unionId, mobile, code })
}

export const userQQBindCode = (mobile) => {
  return request(
    '/login/social/code',
    'get',
    { mobile }
  )
}

export const userQQPatchCode = (mobile) => {
  return request('/register/code', 'get', { mobile })
}

export const userQQPatchLogin = ({ unionId, mobile, code, account, password }) => {
  return request(`/login/social/${unionId}/complement`, 'post', { unionId, mobile, code, account, password })
}
