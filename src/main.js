import Vue from 'vue';
import axios from './http'
import iView from 'iview';
import App from './app'
import router from './router'
import store from './store'
import 'iview/dist/styles/iview.css';

Vue.use(iView); // 组件库

// 开启debug模式
Vue.config.debug = true;
Vue.prototype.$http = axios;

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
    el: '#app',
    router: router,
    store,
    axios,
    render: h => h(App)
})
