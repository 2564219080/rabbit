import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/Home')
const Category = () => import('@/views/Category')
const SubCategory = () => import('@/views/Category/Sub')
const Goods = () => import('@/views/Goods')
const Login = () => import('@/views/Login')
const Callback = () => import('@/views/Login/callback.vue')
const Cart = () => import('@/views/Cart')
const Settlement = () => import('@/views/Settlement')
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/category/:id',
        component: Category
      },
      {
        path: '/category/sub/:id',
        component: SubCategory
      },
      {
        path: '/goods/:id',
        component: Goods
      },
      {
        path: '/cart',
        component: Cart
      },
      {
        path: '/settlement',
        component: Settlement
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }, {
    path: '/login/callback',
    component: Callback
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
