import Vue from "vue";
import VueRouter from "vue-router";
// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
Vue.use(VueRouter)

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
// name跳转的时候用
const routes = [
  // login登录界面的路由设置
  // 首页界面的路由设置
  {
    path: "/",
    name: "Home",
    component: () => import("@/view/home/index.vue"),
  
    //home路由里套其他路由
    children: [
      {
        path: "/singleanalysis",
        name: "Singleanalysis",
        component: () => import("@/view/singleanalysis/index.vue"),
      },
      {
        path: "/teachersmanagement",
        name: "Teachersmanagement",
        component: () => import("@/view/teachersmanagement/index.vue"),
      },
      {
        path: "/applicationmanagement",
        name: "Applicationmanagement",
        component: () => import("@/view/applicationmanagement/index.vue"),
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/view/login/index.vue"),
  },

  //404页面丢失界面
  { path: "*", name: "404", component: () => import("@/view/404/index.vue") }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  //默认has
  mode: "history",
  routes, // (缩写) 相当于 routes: routes
});
//抛出
export default router;