<template>
  <el-dialog
    :title="form.id || form.id === 0 ? '编辑信息' : '新增老师'"
    width="481px"
    class="_edit_teacher"
    :visible.sync="dialogVisible"
  >
  
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="教师姓名" prop="cname">
        <el-input v-model="form.cname" placeholder="请输入您的姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入您的手机号"></el-input>
      </el-form-item>
      <el-form-item label="年龄"  prop="age">
        <el-input
          v-model="form.age"
          placeholder="请输入您的年龄"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option
              v-for="(item, key, index) in sex"
              :key="index"
              :label="item"
              :value="key">
           </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态"  prop="status">
         <template>
             <el-radio-group @change="changeLable" v-model="radio" text-color="#f23"  size="small" fill='#f23'>
                <el-radio  label="1">正常</el-radio>
                <el-radio  label="2">禁用</el-radio>
            </el-radio-group>
         </template>
      </el-form-item>
       <el-form-item label="学段" prop="stage">
        <el-select v-model="form.stage" placeholder="请选择学段">
          <el-option   
            v-for="(item, key, index) in stage"
            :key="index"
            :label="item"
            :value="key">
          </el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="任教科目" prop="subject">
        <el-select v-model="form.subject" placeholder="请选择任教科目">
          <el-option   
            v-for="(item, key, index) in subject"
            :key="index"
            :label="item"
            :value="key">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="btns">
        <el-button  @click="close">取消</el-button>
        <el-button type="primary" @click="affirm">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
      // resetFields	对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      // validateField	对部分表单字段进行校验的方法
      // validate	对整个表单进行校验的方法，参数为一个回调函数
export default {
  name: "TeacherDialog",
  // 传过来的数据 组件传参 申请管理页面
  props: {
    stage: Object,
    subject: Object,
    sex: Object,
  },
  data() {
    var validatePhone = (rule, value, callback) => {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error('请输入正确的手机号'));
          //  return callback(new Error(rule.message));
        } else {
          // if (this.form.phone !== '') {
          //   // 校验form里面的
          //   this.$refs.form.validateField('phone');
          // }
          // return callback();
          callback();
        }
    };
    return {
      dialogVisible: false,
      radio: '1',
      // 渲染的数据对象
      form: {
        // id: "",
        // cname: "",
        // phone: "",
        // age: "",
        // sex: "",
        // stage: "",
        // subject: "",
        // status:""
      },
      // 校验的对象
      rules: {
        cname: [{ required: true, message: "请输入您的姓名" }],
        phone: [
          { required: true, message: "请输入您的手机号" },
          {
            validator: validatePhone,
            message: "请输入正确的手机号",
            trigger: ["blur", "change"],
          },
        ],
        stage: [{ required: true, message: "请选择学段", trigger: "change" }],
        subject: [
          {
            required: true,
            message: "请选择任教科目",
            trigger: "change",
          },
        ],
        status: [{ required: true, message: "请选择状态" }],
      },
    };
  },
  methods: {
    // 点击修改状态
    changeLable(e){
      this.form['status'] = e;
    },
    // 点击编辑 弹出 修改信息form表单
    edits(e) {
      console.log(123,e)
      this.dialogVisible = true;
      this.form = { ...e };
    },
    // 点击确认 
    affirm(){
      //  this.$refs['form'] 也可以通过传参数来用 this.$refs[form]
      // 对整个表单进行校验 validate
      this.$refs['form'].validate((boolean) => {
        if (boolean) { //校验都为真 执行 改变事件
            this.changeIncident();
            this.dialogVisible = false;
        }else{
          this.$message('请填写必填项'); 
        }
      });
    },
    // 点击确认修改
    changeIncident(){
      console.log(this.form)
      // 第一个是定义的名字  第二个是参数
      this.$bus.$emit("changeIncidents",
      JSON.parse(JSON.stringify(this.form))
      // this.form
      );
      this.form = {},
      this.$refs["form"].resetFields();
    },
    // 点击取消
    close(){
      this.dialogVisible = false;
      this.$refs["form"].resetFields();
      this.form = {}
    }
  },
  mounted() {
    // console.log(this.stage,this.sex,"jjj")
    // this.$bus.$emit("close")
  }
};
</script>

<style>
/* .el-radio__input.is-checked+.el-radio__label{
  color: red !important;
} */
/* .el-cascader-node>.el-radio, .el-radio:last-child{
   color: red !important;
} */
.el-input{
  width: 100%;
}
._edit_teacher .el-select {
  width: 100%;
}
.el-dialog__header {
    padding: 10px 20px 10px;
}
.el-dialog__body {
    padding: 18px 20px 3px;
}
.btns {
    margin-left: 46px !important;
}
.el-button+.el-button {
    margin-left: 54px;
}
/* .el-radio__input.is-checked .el-radio__inner {
    border-color: red;
    background: red;
} */
</style>