<template>
  <el-dialog title="选择学校" width="460px" class="_dialog" :visible.sync="dialogVisible">
    <div class="_title">
      {{
      schoolList.length > 0
      ? `当前账号已关联 ${schoolList.length}个学校，请选择登录学校`
      : `当前账号已关联 ${schoolList.length}个学校,请先加入学校`
      }}
    </div>
    <div class="_dialog_radio">
      <el-radio
        v-for="(item, index) in schoolList"
        v-model="active_radio"
        :label="item.id"
        :key="index"
        border
      >{{ item.name }}</el-radio>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="postSchoolRouter">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getSchoolListApi, postSchoolRouter } from "../public/gather_api";
export default {
  // 组件唯一标识
  name: "Dialog",
  data() {
    return {
      active_radio: "1",
      schoolList: []
    };
  },
  // 接受父组件传来的参数
  props: {
    userId: String,
    dialogVisible: Boolean
  },
  // 侦听器
  watch: {
    // 如果 `userId` 发生改变，这个函数就会运行  0->1 2
    userId: function(newQuestion) {
      console.log(newQuestion, "Question");
      this.getSchoolListApi(newQuestion);
    }
  },
  methods: {
    // 父组件传过来的参数 发生改变执行获取学校信息 渲染
    getSchoolListApi(id) {
      getSchoolListApi({ id: id }).then(res => {
        let { data } = res.data;
        // console.log(data,"active_radio");
        this.schoolList = data;
        this.active_radio = data.length > 0 ? data[0].id : "";
        // console.log(this.active_radio,"active_radio")
      });
    },

    // 点击弹框确认 获取用户权限 跳转页面
    postSchoolRouter() {
      postSchoolRouter({
        userId: this.userId,
        id: this.active_radio
      }).then(res => {
         console.log(this.active_radio,"active_radio11")
        console.log(res.data.data)
        localStorage.setItem("router", JSON.stringify(res.data.data));
        this.$router.push({name:"home"})
        this.close()
      })
    },
    // 关闭弹层 子组件传父组件一个方法  父组件里面即可调用
    close() {
      this.$emit("close");
    }
  }
};
</script>
<style lang="scss" scoped>
._dialog {
  ._title {
    margin: 0 auto;
    width: 381px;
  }
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