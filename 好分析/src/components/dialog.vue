<template>
  <!-- 弹出层 -->
  <el-dialog class="_dialog" width="461px" title="选择学校" :visible.sync="centerDialogVisible">
    <div class="_title">
      <!-- 判断请求过来的数据长度 如果大于0 选择学校登录 如果小于0 提示加入学校 -->
      {{
      schoolList.length > 0
      ? `当前账号已关联${schoolList.length}个学校，请选择登录学校`
      :`当前账号已关联${schoolList.length}个学校，请先加入学校`
      }}
    </div>

    <div class="_dialog_radio">
      <el-radio
        v-for="(item,index) in schoolList"
        v-model="schoolActive"
        :label="item.id"
        :key="index"
        border
      >{{item.name}}</el-radio>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="postSchoolRouter">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getSchoolList, postSchoolRouter } from "@/api/api.js";
export default {
  name: "Dialog",
  //接收父组件传过来的参数
  props: {
    centerDialogVisible: Boolean,
    userId: String
  },
  data() {
    return {
      schoolActive: "1",
      schoolList: []
    };
  },

  //侦听器
  watch: {
    userId: function(newQuestion) {
      // newQuestion 新的id
      //调用获取学校列表的函数
      this.getSchoolList(newQuestion);
    }
  },

  methods: {
    // //获取学校列表
    getSchoolList(id) {
      getSchoolList({
        id: id
      }).then(res => {
        //打印 获取到的学校列表数据
        console.log(res.data.data);
        this.schoolList = res.data.data;

        //默认选中，如果数据大于0 选中第一个，否则为空不选
        this.schoolActive = res.data.data.length > 0 ? res.data.data[0].id : "";
      });
    },

    //确认登录
    postSchoolRouter() {
      postSchoolRouter({
        id: this.schoolActive,
        userId: this.userId
      }).then(res => {
        console.log(res);
        localStorage.setItem("router", JSON.stringify(res.data.data));
        this.$router.push({ name: "Home" });
        this.close()
      });
    },

    //关闭弹层
    close() {
      //$emit 子组件向父组件传事件
      //子组件可以通过调用内建的 $emit 方法并传入事件名称来触发一个事件
      this.$emit('close');
      // //关闭弹层
      // this.centerDialogVisible = false;
    }
  }
};
</script>


<style lang="scss" scoped>
._dialog {
  ._dialog_radio {
    .el-radio {
      width: 381px;
      display: block;
      margin: 10px auto;
      .el-radio__input {
        float: right;
        margin-left: 20px;
      }
    }
  }
}
</style>