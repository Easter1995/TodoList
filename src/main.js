import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局scss
import '../src/assets/main.scss'

//创建vm
// new Vue({
// 	el:'#app',
// 	render: h => h(App),
// 	// beforeCreate中模板未解析，且this是vm
// 	beforeCreate(){
// 		Vue.prototype.$bus = this	//安装全局事件总线
// 	}
// })

createApp(App).use(store).use(router).mount('#app')
