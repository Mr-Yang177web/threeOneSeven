// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { 
    path: "/",
    name: "home",
    component: () => import("@/page/home/index.vue"),
    // 重定向
    // redirect: "/firstAnalyse",
    children: [
      {
        // 当 firstAnalyse 匹配成功
        // firstAnalyse 会被渲染在 home 的 <router-view> 中
        path: 'firstAnalyse',
        name:'firstAnalyse',
        component: () => import("@/page/firstAnalyse/index.vue"),
      },
      {
        // 当 firstAnalyse 匹配成功
        // firstAnalyse 会被渲染在 home 的 <router-view> 中
        path: 'from',
        name:'from',
        component: () => import("@/page/firstAnalyse/from.vue"),
      },
      {
        // 当 ApplicationManagement 匹配成功
        // ApplicationManagement 会被渲染在 home 的 <router-view> 中
        path: 'ApplicationManagement',
        component: () => import("@/page/ApplicationManagement/index.vue"),
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'teacherManagement',
        component: () => import("@/page/teacherManagement/index.vue"),
      }
    ]
  },
  { 
    path: "/login",
    name: "login",
    component: () => import("@/page/login/index.vue"),
  },
  { path: "*", name: "404", component: () => import("@/page/404/index.vue") },

]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  mode: "history",
  routes // (缩写) 相当于 routes: routes
})

export default router;