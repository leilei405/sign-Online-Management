import { createApp } from 'vue'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store, { key } from './store'
// 中文
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
// 1.引入ICON图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// 2.icon配置
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus)
app.use(store, key)
app.use(router).mount('#app')
