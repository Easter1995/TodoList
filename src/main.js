import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局scss
import '../src/assets/main.scss'
createApp(App).use(store).use(router).mount('#app')
