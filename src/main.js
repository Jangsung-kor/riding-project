import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'  // 스타일

// Element Plus 아이콘 전역 등록
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// 모든 아이콘을 전역 컴포넌트로 등록
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(ElementPlus)
app.mount('#app')
