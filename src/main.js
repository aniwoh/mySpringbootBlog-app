import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from '@/utils/Route'


const app =createApp(App)
// v-title 全局指令, 用于设置页面标题
app.directive('title', {
    mounted(el, binding) {
    document.title = el.dataset.title;
    },
    updated(el, binding) {
    document.title = el.dataset.title;
}
})
app.use(ElementPlus)
app.use(router)
app.mount('#app')
