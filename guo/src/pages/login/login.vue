<template>
  <div id="app">
    <div id="content">
      <div class="left"></div>
      <div class="right">
        <div class="logimg">
          <img src="../../assets/img/login/mobilelogo.png" alt />
        </div>
        <el-input class="phone" prefix-icon="el-icon-user" placeholder="请输入内容" v-model="phone"></el-input>
        <el-input class="code" prefix-icon="el-icon-lock" placeholder="请输入短信验证码" v-model="code">
          <div
            :class="/^1[3456789]\d{9}$/.test(phone) ? 'oksend' : 'send'"
            slot="suffix"
            @click="send"
            :disabled="!sendeCode"
          >{{codeText}}</div>
        </el-input>

        <el-button
          :class="(/^1[3456789]\d{9}$/.test(phone) && code) ? 'login' : 'nologin'"
          :disabled="!(/^1[3456789]\d{9}$/.test(phone) && code)"
          @click="loginBtn"
          class="login"
        >登录/注册</el-button>
      </div>
    </div>

    <!-- 弹出层 -->
    <!-- 判断请求过来的数据长度 如果大于0 选择学校登录 如果小于0 提示加入学校 -->
    <!-- <el-dialog class="_dialog" width="461px" title="选择学校" :visible.sync="centerDialogVisible">
      <div class="_title">   
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
    v-on:close="dialogVisible = false"
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="postSchoolRouter">确 定</el-button>
      </span>
    </el-dialog>-->
    <Dialog
      :centerDialogVisible="centerDialogVisible"
      :userId="userId"
      v-on:close="centerDialogVisible = false"
    />
    <!-- 绑定事件向子组件传入参数 -> 关闭弹层 -->
  </div>
</template>

<script>
import { getList, getlogin } from "@/api/api.js";
import { _random } from "@/utils/utils.js";
import Dialog from "../../components/dialog.vue";
export default {
  name: "Login",
  data() {
    return {
      phone: "",
      code: "",
      phoneCode: "",
      sendeCode: false,
      codeText: "发送验证码",
      centerDialogVisible: false,
      userId: ""
    };
  },
  //login页分出的组件页
  components: {
    Dialog: Dialog
  },

  methods: {
    getphone() {
      let phone = this.phone;
      let phoneCode = _random(1000, 9999);
      this.phoneCode = phoneCode;

      this.$message.success("发送成功");
      // console.log(phone, phoneCode, "wwwww");
      getList({
        phone: Number(phone),
        phoneCode: phoneCode
      }).then(res => {
        // 请求过来的数据
        console.log(res.data);
        //数据请求过来的验证码
        console.log(res.data.data.code);
        let { code } = res.data;
        console.log(code);
        if (code === 1) {
          this.code = res.data.data.code;
        }
      });
    },

    //点击发送验证码
    send() {
      if (
        /^1[3456789]\d{9}$/.test(this.phone) &&
        this.codeText === "发送验证码"
      ) {
        console.log(this.phone);

        let seconde = 5;
        let time = setInterval(() => {
          seconde--;
          this.sendeCode = seconde === 0 ? true : false;
          this.codeText = seconde === 0 ? "发送验证码" : `${seconde}s`;
          if (seconde < 1) {
            clearInterval(time);
          }
        }, 1000);
      }

      //调用
      this.getphone();
    },

    //点击登录
    loginBtn() {
      let user = {
        phone: this.phone,
        code: this.code,
        phoneCode: this.phoneCode
      };
      let _message = this.$message({
        message: "登录中请稍等...",
        type: "success",
        duration: 15000,
        center: "center"
      });
      console.log(user);
      getlogin(user).then(res => {
        let { code, message, data } = res.data;
        localStorage.setItem("user", JSON.stringify(data));
        if (code === 1) {
          console.log(this.$router);
          // this.code = data.data.code;
          // console.log(data.id);
          this.userId = data.id;
          //打开弹层
          this.centerDialogVisible = true;
          // console.log(String(data.id));
          //调用下面的方法 传入id
          // this.getSchoolList(data.id);
          // console.log(this.$router.options.routes);
          //跳转页面
          // this.$router.push({ name: "Home" });
          //本地存储数据，
          // localStorage.setItem("user", JSON.stringify(data));
        }
        _message.close();
        this.$message({
          message: message,
          type: code === 1 ? "success" : "error"
        });
      });
    },

    //子组件可以向父组件传参
    // close($event){
    //   console.log($event);
    // }
  },
  // html挂在后执行（只执行一次）适用于请求数据
  mounted: function() {}
};
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

#app {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/login/bg.png") no-repeat;
  background-size: cover;
  position: relative;
  #content {
    position: absolute;
    top: 75px;
    left: 90px;
    width: 1264px;
    height: 550px;
    border-radius: 12px;
    background-color: #ffffff;
    display: flex;
    .left {
      margin-top: 60px;
      margin-left: 30px;
      box-sizing: border-box;
      width: 612px;
      height: 440px;
      background: url("../../assets/img/login/loginleft.png") no-repeat;
      background-size: cover;
    }
    .right {
      width: 364px;
      height: 365px;
      margin-left: 150px;
      margin-top: 60px;

      .logimg {
        width: 152px;
        height: 54px;
        margin-bottom: 50px;
        & > img {
          display: block;
          width: 100%;
          height: 100%;
          margin-left: 90px;
        }
      }
      .phone,
      .code {
        outline: none;
        border: 0px solid #ffffff;
        margin-bottom: 30px;
      }

      .code {
        .el-input__suffix {
          .el-input__suffix-inner {
            display: inline-block;
            height: 100%;
            .send {
              height: 100%;
              line-height: 40px;
              cursor: not-allowed;
            }
            .oksend {
              color: #0fbc77;
              line-height: 40px;
              cursor: pointer;
            }
          }
        }
      }

      .login {
        width: 100%;
        height: 46px;
        background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%);
        border-radius: 5px;
        color: #ffffff;
      }
      .nologin {
        opacity: 0.6;
      }
    }
  }

  // ._dialog {
  //   ._dialog_radio {
  //     .el-radio {
  //       width: 381px;
  //       display: block;
  //       margin: 10px auto;
  //       .el-radio__input {
  //         float: right;
  //         margin-left: 20px;
  //       }
  //     }
  //   }
  // }
}
</style>
