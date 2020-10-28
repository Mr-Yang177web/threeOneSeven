import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from "./router";
import permission from "./permission.js";
import bus from "./public/bus.js"
import store from "./store/index.js";

Vue.use(ElementUI);
Vue.config.productionTip = false

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能

// 全局注册组件
Vue.component("TeacherDialog", () =>
  import("./components/edit_teacher")
);

// 将bus绑定到全局上
Vue.prototype.$bus = bus;

new Vue({
  store,
  permission,
  router,
  render: h => h(App),
}).$mount('#app')
