<template>
  <!-- 弹出层 -->
  <el-dialog
    class="teccher_dialog"
    width="461px"
    title="选择学校"
    :visible.sync="visible"
    :before-close="cancel"
  >
    <!-- 表单 -->
    <el-form
      :model="teacherInfo"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="教师姓名" prop="name">
        <el-input v-model="teacherInfo.name" placeholder="请输入您的姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input placeholder="请输入您的手机号" v-model="teacherInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input placeholder="请选择您的年龄" v-model="teacherInfo.age"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-select v-model="teacherInfo.sex" placeholder="请选择性别">
          <el-option v-for="(item, key, index) in sex" :key="index" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学段" prop="stage">
        <el-select v-model="teacherInfo.stage" placeholder="请选择学段">
          <el-option v-for="(item, key, index) in stage" :key="index" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任教科目" prop="subject">
        <el-select v-model="teacherInfo.subject" placeholder="请选择任教科目">
          <el-option v-for="(item, key, index) in subject" :key="index" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "EeacherDialog",
  //接收父组件传过来的参数
  props: {
    sex: Object,
    stage: Object,
    subject: Object
  },

  data() {
    var rulePhone = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error(rule.message));
      } else {
        return callback();
      }
    };
    return {
      //教师信息
      teacherInfo: {},
      //弹层
      visible: false,

      //表单验证规则
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入您的手机号" },
          {
            validator: rulePhone,
            message: "请输入正确的手机号",
            trigger: ["blur", "change"]
          }
        ],
        stage: [{ required: true, message: "请选择学段", trigger: "change" }],
        subject: [
          {
            required: true,
            message: "请选择任教科目",
            trigger: "change"
          }
        ]
      }
    };
  },

  //侦听器
  watch: {
    // userId: function(newQuestion) {
    //   // newQuestion 新的id
    //   //调用获取学校列表的函数
    //   this.getSchoolList(newQuestion);
    // }
  },

  methods: {
    //父子组件传参调用的方法
    editor(row) {
      this.visible = true;
      this.teacherInfo = { ...row };
    },

    //取消
    cancel() {
      this.visible = false;
      this.teacherInfo = {};
      this.$refs["form"].resetFields();
    },

    //点击确定
    submitForm(ref) {
      this.visible = false;
      this.$refs[ref].validate((boolean, object) => {
        console.log(boolean, object);
        if (boolean) {
          this.change();
        }
      });
    },

    change() {
      //创建
      this.$bus.$emit(
        "teacherInfo",
        JSON.parse(JSON.stringify(this.teacherInfo))
      );

      this.teacherInfo = {};
      //默认第一次进去不检测
      this.$refs["form"].resetFields();
    }
  },
  mounted() {
    console.log(this.visible);
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