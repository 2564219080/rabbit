import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/styles/common.less'
import componentPlugin from '@/components'

createApp(App).use(store).use(router).use(componentPlugin).mount('#app')
