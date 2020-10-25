<template>
  <el-dialog
    class="_dialog"
    title="选择学校"
    :visible.sync="dialogVisible"
    width="30%"
  >
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
        v-model="radio"
        :label="item.id"
        :key="index"
        border
        >{{ item.name }}</el-radio
      >
    </div>
    <span slot="footer">
      <el-button  @click="close">取 消</el-button>
      <el-button type="primary" @click="postschoolrouter">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getschoolList, postschoolrouter } from "@/api/api";
export default {
  name: "Dialog",
  props: {
    //弹框是否出线开关
    dialogVisible: Boolean,
    //父组件传过来的用户的id
    userId: String,
  },
  data() {
    return {
      radio: "1",
      schoolList: [],
    };
  },
  //第一次传过来的userID为0 当弹层打开 id被赋值改变 watch事件监听到UuserId的改变从而调用函数
  watch: {
    //newQuestion 相当于进来后改变过后的ID  watch事件监听到UuserId的改变从而调用函数
    userId: function (newQuestion) {
      this.getschoolList(newQuestion);
    },
  },

  //写方法
  methods: {
    //根据id判断权限 所请求回来的学校列表数据
    getschoolList(id) {
      console.log(id,"bbbbbbgg")
      getschoolList({ id: id }).then((res) => {
        this.schoolList = res.data.data;
        console.log(this.schoolList);
        //通过渲染学校的数据 来判断学校 并且给第一个学校默认选中
        // 高新班id为1 末班为id为2 这样就可以知道选择的那个学校
        this.radio =  res.data.data.length > 0 ? res.data.data[0].id: "";
      });
    },
    //点击确认按钮 同样通过id来判断他的权限能访问那几个功能
    //根据选择的学校 展示不同的权限功能
    postschoolrouter() {
      // { id: this.radio, userId: this.userId }
      postschoolrouter({ id: this.radio, userId: this.userId }).then((res) => {
        console.log({ id: this.radio, userId: this.userId })
        console.log(res,res.data.data);
        //点击确认的时候要把学校的数据也存到本地上
        localStorage.setItem("router", JSON.stringify(res.data.data));

        //跳转界面
        this.$router.push({ name: "Home" });
        this.close()
      });
    },

    //点击取消按钮
    close(){
      this.$emit("close")
    }
  },
};
</script>

<style lang="scss" scoped>
._dialog {
  ._title {
    width: 320px;
    margin: 0 auto;
  }
  ._dialog_radio {
    .el-radio {
      width: 80%;
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