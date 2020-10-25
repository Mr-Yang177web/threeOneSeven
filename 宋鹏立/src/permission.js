//路由守卫
import router from "./router/index.js"
// next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
// next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
// next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象

//先定义最外层的路由
let loactionActiv = ["/", "/login"]

const loactionFn = (l) => {
    l.forEach((item) => {
        if (item.children) {
            loactionFn(item.children);
        } else {
            loactionActiv.push(item.path);
        }
    });
};

router.beforeEach((to, from, next) => {
    //获取本次用户登录的权限 即能访问那些界面  两种情况 未登录或者有数据
    const loactive = JSON.parse(localStorage.getItem("router")) || []
    loactionActiv = ["/", "/login"];
    //当用户没有储存权限信息的时候 清除所有本地储存
    if(loactive.length === 0){
        localStorage.clear()
    }
    loactionFn(loactive);
    if (loactionActiv.indexOf(to.path) >= 0) {
        next();
    } else {
        router.go(-1);
    }
});

export default router;