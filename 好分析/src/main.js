import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from "./permisssion";
import store from './store'
import EeacherDialog from "./components/teacherDialog.vue";
import bus from "@/utils/bus";

Vue.config.productionTip = false;
Vue.use(ElementUI);

//全局注册组件
Vue.component("EeacherDialog",EeacherDialog)


// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
// const app = new Vue({
  
// }).$mount('#app')


//
Vue.prototype.$bus = bus;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
