<template>
  <div>
    <template v-for="(item, index) in router">
        <el-submenu :key="index" v-if="item.children" :index="item.name">
          <template slot="title">
            <i class="el-icon-s-marketing"></i>
            <span>{{item.name}}</span>
          </template>
          <SubMenu :router="item.children"></SubMenu>
        </el-submenu>
        <el-menu-item-group :key="index" v-else>
            <el-menu-item :index="item.path">{{item.name}}</el-menu-item>
        </el-menu-item-group>
    </template>
  </div>
</template>

<script>
export default {
  name:"SubMenu",
  // 接受父组件传来的参数
  props:{router:Array},
  data(){
    return {}
  },
  methods: {},
  mounted() {
    // console.log(this.router);
  },
};
</script>

<style>

</style>