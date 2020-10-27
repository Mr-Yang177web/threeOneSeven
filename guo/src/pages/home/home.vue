<template>
  <el-container id="home">
    <!-- 头 -->
    <el-header>
      <div class="out" @click="logingOut">
        <i class="el-icon-switch-button"></i>
        退出
      </div>
      <!-- 头像 -->
      <div class="block"  >
        <el-image @click="changeOut" :src="user.headimg"></el-image>
      </div>

      <!-- 弹层 -->
      <Dialog
        :centerDialogVisible="centerDialogVisible"
        :userId="user.id"
        v-on:close="centerDialogVisible = false"
      />
    </el-header>

    <!-- 内容 -->
    <el-container>
      <el-aside width="240px">
        <el-menu
          :router="true"
          :default-active="active"
          :default-openeds="openeds"
          class="el-menu-vertical-demo"
        >
          <subMen :router="router" />
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-marketing"></i>
              <span>成绩分析</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/meanu1">单次分析</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span>学校管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/meanu2">教师管理</el-menu-item>
              <el-menu-item index="/applicationAdmin">申请管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>-->
        </el-menu>
      </el-aside>

      <el-main>
        <!-- home：显示路由页面（当前页面下，也就是home的子项） -->
        <router-view></router-view>
      </el-main>
    </el-container>

    <!-- 脚 -->
    <el-footer>
      Copyright © 易校园有限公司
      湘ICP备15014295号-2公安机关备案号：43011102001327 友情链接：易校园
    </el-footer>



  </el-container>
</template>

<script>
import subMen from "../../components/subMen.vue";
import Dialog from "../../components/dialog.vue";
export default {
  name: "Home",
  data() {
    return {
      user: "",
      active: "",
      openeds: [],
      router: JSON.parse(localStorage.getItem("router")) || [],  
      centerDialogVisible: false,
    };
  },
  components: {
    subMen: subMen,
    Dialog: Dialog
  },

  // // 切换同级children，监听$route的变化来修改菜单
  watch: {
    //to:即将去哪个路由，from:从哪个路由过来
    $route(to) {
      this.active = to.path;   
    }
  },
  methods: {
    //退出登录
    logingOut() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
    //打开submen
    opensubMen(router) {
      //遍历router
      router.forEach(item => {
        if (item.children) {
          this.openeds.push(item.name);
          this.opensubMen(item.children);
        }
      });
    },
    // 手动解决重定向
    getActive(router, redirect) {
      // 如果进来是 '/' 说明需要重定向，不是'/'则不走我们的重定向代码
      if (redirect !== "/") {
        // console.log(this.$route.path);
        this.active = this.$route.path;
        return;
      }
      // 根据children来决定谁是第一个，也就是重定向的目标
      if (router.children) {
        // console.log(router.children);
        router.children.forEach((item, index) => {
          // console.log(item);
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
        // console.log(1111111111,router.path);
        this.active = router.path;
      }
    },
    // //打开弹层
    changeOut(){
    this.centerDialogVisible = true;
    }



  },
  mounted() {
    // console.log(this.$route);
    console.log(this.router);
    // console.log(this.user);
    this.opensubMen(this.router);
    //判断本地存储是否有数据，
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
      console.log(this.user.headimg);
      // this.src = JSON.parse(localStorage.getItem("user").headimg)
      // console.log(JSON.parse(this.user).id);
      // this.user.id = JSON.parse(this.user).id
      // this.userId = JSON.parse(this.user).id
      
    } else {
      //如果没有，返回login页
      this.$router.push({ name: "Login" });
    }
    console.log(JSON.parse(localStorage.getItem("router")));
    console.log(JSON.parse(localStorage.getItem("user")).headimg);

    /*
    1、this.$router: router的实例，包含全部路由和参数
    2、this.$route: 当前页面路由参数，包含传过来的参数params、query
    */
    // this.active = this.$route.path;

    this.getActive(this.router[0], this.$route.path);

    // 使用params传参：默认会隐藏拼接的路径，同时需要使用name形式传递
    // this.$router.push({ name: "Login", params: { id: "456" } });

    // 使用query传参：默认显示/login?id=456，不受name、path的影响
    //  this.$router.push({ name: "Login", query: { id: "456" } });
  }
};
</script>

<style lang="scss">
#home {
  height: 100%;
  width: 100%;
  background: #fcfcfc;
  .el-header {
    background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%) !important;
    line-height: 70px !important;
    height: 70px !important;
    padding: 0 31px;
    .out {
      float: right;
      color: #fff;
      cursor: pointer;
    }
    .block {
      width: 60px;
      height: 60px;
      position: absolute;
      top: 8px;
      right: 120px;
      & > .el-image {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50% !important;
      }
    }
  }
  .el-footer {
    background: #343533;
    color: #fff;
    text-align: center;
    line-height: 43px !important;
    height: 43px !important;
    font-size: 16px;
  }
  .el-aside {
    border-right: 1px solid #ccc;
    background: #fff;
    .el-menu-vertical-demo {
      border-right: 0px solid #fff;
    }
  }
}
</style>
