<template>
  <div>
    <template v-for="(item, index) in router">
      <el-submenu :key="index" v-if="item.children" :index="item.name">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </template>
        <subMen :router="item.children" />
      </el-submenu>

      <el-menu-item :key="index" v-else :index="item.path">{{ item.name }}</el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
    name:"subMen",
    //接收父组件传过来的参数
    props:{router:Array},
    data(){
        return{
            xxxx:9999
        }
    }
};
</script>

<style>
</style>