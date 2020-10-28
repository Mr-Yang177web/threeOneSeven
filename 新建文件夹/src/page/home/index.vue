<template>
  <el-container id="home">
    <el-header class="home_header">
      <div class="out" @click="login_GoOut">
        <i class="el-icon-switch-button"></i>
        退出
      </div>
      <div class="out haed" @click="dialogVisible = true">
        <img :src="user.img" alt />
        <span class="name">{{user.nickName}}</span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="210px">
        <el-col>
          <el-menu
            :default-active="active"
            :default-openeds="openeds"
            class="el-menu-vertical-demo"
            :router="true"
          >
            <SubMenu :router="router" />
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer>
      Copyright © 易校园有限公司
      湘ICP备15014295号-2公安机关备案号：43011102001327 友情链接：易校园
    </el-footer>
      <Dialog
        :dialogVisible="dialogVisible"
        :userId="user.id"
        v-on:close="dialogVisible = false"
      />
  </el-container>
</template>
<script>
// 引入组件
import submenu from "../../components/submenu.vue";
import Dialog from "../../components/dialog.vue";
export default {
  name: "home",
  data() {
    return {
      user: "",
      active: "",
      // 默认展开有children的节点
      openeds: [],
      dialogVisible:false,
      router: JSON.parse(localStorage.getItem("router")) || []
      // [{name: "成绩分析",
      //     children: [ {
      //         name: "单次分析",
      //         path: "/firstAnalyse"}]},{
      //     name: "学校管理",
      //     children: [{name: "教师管理",path: "/teacherManagement"
      //       },{name: "申请管理",path: "/ApplicationManagement"}
      //   ]},]
    };
  },
  // 切换同级children，监听$route的变化来修改菜单
  // 修复的bug：点击切换菜单 返回后 高亮与menu不匹配
  watch: {
    //to:即将去哪个路由，from:从哪个路由过来
    $route(to) {
      this.active = to.path;
      // 当点击头像切换学校后 本地数据发生改变 所以从新定义router
      this.router = JSON.parse(localStorage.getItem("router"))
    },
    // 监听 当router数据发生改变后 重新定向 展开
    router(){
      this.getSubMenu(this.router);
      this.getActive(this.router[0], this.$route.path);
    }
  },
  // 使页面组件化
  components: {
    SubMenu: submenu,
    Dialog:Dialog
  },
  // 提供的方法
  methods: {
    login_GoOut() {
      localStorage.clear();
      this.$router.push({ path: "login" });
    },

    // 默认展开 递归_回调
    getSubMenu(router) {
      router.forEach(item => {
        if (item.children) {
          //如果有children 说明需要展开  继续调用this.getSubMenu(item.children)方法;
          this.openeds.push(item.name);
          this.getSubMenu(item.children);
        }
      });
    },

    // 手动决定重定向 刚进入页面或跳到其他页面返回后的 页面路由
    getActive(router, redirect) {
      // 如果没有重定向  跳到其他页面 放回页面后后 为之前跳转之前的页面路由
      if (redirect !== "/") {
        this.active = this.$route.path;
        return;
      }
      // // 每次页面加载完成后 都会重定向页面 数组里的第一项路由
      if (router.children) {
        router.children.forEach((item, index) => {
          if (index === 0) {
            if (item.children) {
              this.getActive(item);
            } else {
              this.active = item.path;
              this.$router.push({ path: item.path });
            }
          }
        });
      } else {
        // console.log(router.path);
        this.active = router.path;
        this.$router.push({ path: router.path });
      }
      // if(redirect ==='/'){
      // // 每次页面加载完成后 都会重定向页面 数组里的第一项路由
      //   if(router.children){
      //     router.children.forEach((item,index)=>{
      //       if(index === 0 ){if(item.children){
      //           this.getActive(item)}else{
      //           this.active = item.path;
      //           this.$router.push({ path: item.path })}
      //       }})}}else{
      //   this.active = this.$route.path;
      //   return;}
    }
  },
  mounted() {
    // 默认展开导航菜单 递归_回调
  
    console.log(this.$route);
    if (localStorage.getItem("user")) {
      this.getSubMenu(this.router);
      this.getActive(this.router[0], this.$route.path);
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      this.$router.push({ name: "login" });
    }

    // 死版的修改路由 页面加载默认显示路由  跳到其他页面返回后的bug 设定页面路由
    // this.active = this.$route.path;

    // 重定向
    // 手动解决重定向
    // this.getActive(this.router[0], this.$route.path);
  }
};
</script>

<style lang="scss">
#home {
  height: 100%;
  & > .home_header {
    background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%);
    line-height: 66px;
    height: 66px;
    width: 100%;
    .out {
      float: right;
      color: #fff;
      cursor: pointer;
    }
    .haed {
      display: flex;
      float: right;
      margin-right: 40px;
      & > img {
        margin-top: 5px;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: block;
      }
      & > .name {
        font-size: 13px;
        margin: 0 4px;
      }
    }
  }
  & > .el-container {
    .el-aside {
      border-right: 1px solid #ccc;
      .el-col-12 {
        width: 100%;
        & > .el-menu {
          border: none;
        }
      }
    }

    & > .el-main {
      background: #fdfdfd;
    }
  }
  & > .el-footer {
    text-align: center;
    line-height: 40px !important;
    height: 40px !important;
    background: #343533;
  }
}
</style>