import permission from "./router";

let publicPath = ["/","/login"];


// const route = [
//     {
//         name: "成绩分析",
//         children: [
//             {
//                 name: "单次分析",
//                 path: "/firstAnalyse"
//             }
//         ]
//     },
//     {
//         name: "学校管理",
//         children: [
//             {
//                 name: "教师管理",
//                 path: "/teacherManagement"
//             },
//             {
//                 name: "申请管理",
//                 path: "/ApplicationManagement"
//             }
//         ]
//     },
// ]

const loopFun = (res)=>{
    res.forEach((item)=>{
        if(item.children){
            loopFun(item.children)
        }else{
            publicPath.push(item.path)
        }
    })
}

// router.beforeEach 注册一个全局前置守卫
permission.beforeEach((to, from, next) => {
    let localStorageRouter = JSON.parse(localStorage.getItem('router')) || [];
    console.log(localStorageRouter,"localStorageRouter")
    publicPath = ["/","/login"];
    if(localStorageRouter.length === 0){
        localStorage.clear();
        // next({ path: from.path })
    }
    loopFun(localStorageRouter)
    // 如果你去的那个页面 是数组里面已有的 则为true 走进去 next()确认跳转  不是则返回上一页面 或首页
    if(publicPath.indexOf(to.path)!==-1){
        // next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
        next()
    }else{
    // next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。
    // 当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，
    // 且允许设置诸如 replace: true、name: 'home' 之类的选项
    // 以及任何用在 router-link 的 to prop 或 router.push 中的选项。
    //   next({ path: from.path });  //一直首页 路由进来后就是 / 后手动重定向
    // 后退一步记录，等同于 history.back()
    permission.go(-1)
    }
})
export default permission;
