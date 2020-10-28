<template>
  <el-container id="home">
    <el-header>
      教师管理系统

      <div class="out_img">
        <img src="../../assets/img/login/mobilelogo.png" alt="" />
      </div>
      <div class="out" @click="logingOut">
        <i class="el-icon-switch-button"></i>
        退出
      </div>
      <div class="headPortrait" @click="dialogVisible = true">
        <img :src="user.data.img" alt="" />
        {{ user.data.nickName }}
      </div>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside class="aaa" width="200px">
        <el-menu
          :router="true"
          :default-openeds="openeds"
          :default-active="active"
          class="el-menu-vertical-demo"
        >
          <!-- 组件  传参数 -->
          <SubMenu :shuju="router" />
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>
          Copyright © 易校园有限公司
          湘ICP备15014295号-2公安机关备案号：43011102001327
          友情链接：易校园</el-footer
        >
      </el-container>
    </el-container>
    <Dialog
      :dialogVisible="dialogVisible"
      :userId="userId"
      v-on:close="dialogVisible = false"
    />
  </el-container>
</template>

<script>
//引入组件 在下方定义参数等于组件
import SubMenu from "@/components/Submenu.vue";
//头像切换的时候要用 弹框组件
import Dialog from "@/components/Dialog.vue";

export default {
  name: "Home",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")) || {},
      userId: "0",
      //默认选中
      active: "",
      //侧边栏展开
      openeds: [],
      //数据 渲染侧边栏的数据
      router: JSON.parse(localStorage.getItem("router")),
      dialogVisible: false,
    };
  },
  //组件
  components: {
    SubMenu: SubMenu,
    Dialog: Dialog,
  },
  watch: {
    //to:即将去哪个路由，from:从哪个路由过来
    $route(to, from) {
      this.active = to.path;
      console.log(from);
    },
    router() {
      //侧边栏展开事件调用
      this.getopeneds(this.router);
      //高亮的永远是第一个数据的第一个可选项
      this.getActive(this.router[0], this.$route.path);
      //判断时候是登录状态
    },
  },
  methods: {
    //登录按钮
    logingOut() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },

    //展开所有侧边栏 通过循环判断是否存在children
    getopeneds(router) {
      if (router) {
        router.forEach((item) => {
          if (item.children) {
            this.openeds.push(item.name);
          }
          //  递归
          this.getopeneds(item.children);
        });
      }
    },

    //重定向  参数 router：数据   redirect：路径
    getActive(router, newPath) {
      //如果是刚从首页（/）进来 则需要高亮第一个
      //如果不是是刚从首页（/）进来 则高亮原来的选项
      if (newPath !== "/") {
        this.active = this.$route.path;
        return;
      }
      //当时从首页进来的话  如果第一项数据存在children 那么遍历
      if (router.children) {
        router.children.forEach((item, index) => {
          // 如果index === 0  则说明是第一个对象
          if (index === 0) {
            //如果还存在children的话 递归继续循环
            if (item.children) {
              this.getActive(item);
            } else {
              this.active = item.path;
              //跳转界面 相当于展示高亮的界面
              this.$router.push({ path: item.path });
            }
          }
        });
      } else {
        this.active = router.path;
      }
    },
  },
  //页面加载完成 html渲染成功
  mounted() {
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.userId = this.user.data.id;
    } else {
      this.$router.push({ name: "Login" });
    }
    //侧边栏展开事件调用
    this.getopeneds(this.router);
    //高亮的永远是第一个数据的第一个可选项
    this.getActive(this.router[0], this.$route.path);
    //判断时候是登录状态
  },
};
</script>

<style lang="scss">
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
#home {
  width: 100%;
  height: 100%;
  .el-header {
    position: relative;
    background: linear-gradient(270deg, #17c4bb 0%, #dadada 100%) !important;
    .headPortrait {
      display: flex;
      width: 50px;
      height: 50px;
      position: absolute;
      top: 3px;
      right: 130px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .out_img {
      float: left;
      width: 10%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .out {
    float: right;
  }
}
</style>