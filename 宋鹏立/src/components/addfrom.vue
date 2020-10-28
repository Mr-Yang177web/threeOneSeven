<template>
  <el-dialog
    class="_addfrom"
    :visible.sync="dialogVisible"
    :title="teacherInfo.id || teacherInfo.id === 0 ? '编辑信息' : '新增老师'"
    width="30%"
  >
    <el-form
      :model="teacherInfo"
      :rules="rules"
      ref="teacherInfo"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="教师姓名" prop="name">
        <el-input v-model="teacherInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="teacherInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="teacherInfo.age"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="teacherInfo.sex" placeholder="请选择性别">
          <el-option
            v-for="(item, key, index) in sex"
            :key="index"
            :label="item"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="学段" prop="stage">
        <el-select v-model="teacherInfo.stage" placeholder="请选择活动区域">
          <el-option
            v-for="(item, key, index) in stage"
            :key="index"
            :label="item"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="任教科目" prop="subject">
        <el-select v-model="teacherInfo.subject" placeholder="请选择活动区域">
          <el-option
            v-for="(item, key, index) in subject"
            :key="index"
            :label="item"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submitForm('teacherInfo')"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Addfrom",
  data() {
    // 验证手机号的判断
    var rulePhone = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error(rule.message));
      } else {
        return callback();
      }
    };
    return {
      //数据默认为空
      teacherInfo: {
        id: "",
        name: "",
        phone: "",
        age: "",
        sex: "",
        stage: "",
        subject: "",
      },
      //开关默认为关闭状态
      dialogVisible: false,
      //from表单的rules  必填项
      rules: {
        //姓名的判定
        name: [{ required: true, message: "请输入您的姓名" }],
        // 手机号的判定
        phone: [
          { required: true, message: "请输入您的手机号" },
          {
            validator: rulePhone,
            message: "请输入正确的手机号",
            trigger: ["blur", "change"],
          },
        ],
        // 学段的判定
        stage: [{ required: true, message: "请选择学段", trigger: "change" }],
        // 科目的判定
        subject: [
          {
            required: true,
            message: "请选择任教科目",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState("teacherInfo", {
      stage: "stage",
      subject: "subject",
      sex: "sex",
    }),
  },
  //写方法
  methods: {
    //修改数据 打开弹框 对应当前数据
    edit(e) {
      this.teacherInfo = { ...e };
      this.dialogVisible = true;
    },

    //点击确认按钮修改数据  from表单自带
    submitForm(teacherInfo) {
       console.log(this.$refs[teacherInfo].validate)
      //通过$refs[里面是上面res定义的标识]
      this.$refs[teacherInfo].validate((valid) => {
        if (valid) {
          this.changeInfo();
        }
      });
    },
    //点击取消
    close() {
      this.dialogVisible = false;
      this.$refs['teacherInfo'].resetFields();
        this.teacherInfo = {
        id: "",
      };
    },
  //改变事件 深拷贝
    changeInfo() {
      //通过$bus下面的$emit找到标识 因为bus是vue的实例 所以下面也有$emit方法
      this.$bus.$emit(
        "teacherInfo",
        JSON.parse(JSON.stringify(this.teacherInfo))
      );
      this.close()
    },
  },
};
</script>

<style lang="scss" scoped>
._addfrom {
  ._title {
    width: 320px;
    margin: 0 auto;
  }
  .footer {
    text-align: center !important;
    position: relative;
    left: -40px;
  }
  .el-select {
    width: 320px !important;
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