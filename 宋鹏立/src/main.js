import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import store from "./store"
import "element-ui/lib/theme-chalk/index.css";
import bus from './utils/bus'
//路由守卫
import router from "./permission.js"

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$bus = bus;
// 全局注册组件
Vue.component("Addfrom", () =>
  import("./components/addfrom.vue")
);

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");


