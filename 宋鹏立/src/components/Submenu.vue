<template>
  <div>
    <!-- 循环这个数据 -->
    <template v-for="(item, index) in shuju">
      <el-submenu :key="index" v-if="item.children" :index="item.name">
        <template slot="title">
          <i class="el-icon-s-marketing"></i>
          <span>{{ item.name }}</span>
        </template>
        <SubMenu :shuju="item.children" />
      </el-submenu>
      <el-menu-item :key="index" v-else :index="item.path">{{
        item.name
      }}</el-menu-item>
    </template>
  </div>
</template>


<script>
export default {
  name: "SubMenu",
  //接受父组件传来的参数  规定数组格式
  props: { shuju: Array },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    console.log(this.shuju);
  },
};
</script>

<style>
</style>