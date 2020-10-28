<template>
  <div id="login">
    <div class="app_content">
      <div class="left">
        <img :src="img.loginleft" />
      </div>
      <div class="right">
        <div class="template">
          <img :src="img.mobilelogo" />
          <el-input
            class="phone"
            prefix-icon="el-icon-user"
            @input="phoneInput"
            placeholder="请输入手机号"
            v-model="iphon"
          ></el-input>
          <el-input
            class="code"
            prefix-icon="el-icon-lock"
            @input="phonecode"
            placeholder="请输入短信验证码"
            v-model="code"
          >
            <el-button
              :disabled="falg"
              :class="(/^1[3456789]\d{9}$/.test(iphon) && login) ? 'affirm' : 'sendAffirm'"
              slot="suffix"
              @click="sendCode"
            >{{sendBtn}}</el-button>
          </el-input>
          <el-button
            :disabled="!(/^1[3456789]\d{9}$/.test(iphon) && (code !== '') )"
            @click="infoBtn"
            :class="login ? 'login login_style' : 'login login_style' "
          >登录 / 注册</el-button>
        </div>
      </div>
    </div>
    <Dialog
      :dialogVisible="dialogVisible"
      :userId="userId"
      v-on:close="dialogVisible = false"
    />
  </div>
  <!-- :before-close="handleClose" -->
</template>

<script>
import { postApi, postApiPhone } from "../../public/gather_api";
import mobilelogo from "../../assets/img/login/mobilelogo.png";
import loginleft from "../../assets/img/login/loginleft.png";
import Dialog from "@/components/dialog.vue";
export default {
  name: "login",
  data() {
    return {
      code: "",
      iphon: "",
      phoneCode: "",
      sendBtn: "发送验证码",
      falg: true,
      img:{
        loginleft: loginleft,
        mobilelogo: mobilelogo,
      },
      userId:'0',
      login:false,
      dialogVisible: false

    };
  },
  methods: {
    phoneInput(e) {
      if (!e) {
         this.$message('手机号不能为空');
      }
      if (e) {
        var tell = /^[1][3,4,5,6,7,8,9]\d{9}$/;
        this.falg = !tell.test(e);
        this.login = true;
      }
    },
    phonecode(e) {
      this.phoneCode = e;
      if (!e) {
         this.$message('请输入短信');
        // alert("请输入短信");
      }
    },
    // 点击发送验证码
    sendCode() {
      this.$message.success("发送成功");
      this.login = false;
      this.falg = true;
      let nums = 10;
      // 点击发送按钮进入倒计时
      let time = setInterval(() => {
        nums--;
        (this.sendBtn = nums === 0 ? "发送验证码" : `${nums}秒`),
          (this.flag = nums === 0 ? true : false);
        if (nums === 0) {
           this.login = true;
          console.log(this.falg);
          (this.falg = false), (this.sendBtn = "发送验证码");
          clearInterval(time);
        }
      }, 1000);

      postApi({
        code: Math.floor(Math.random() * (9999 - 1000 + 1) + 1000),
        iphon: this.iphon
      }).then(res => {
        this.code = res.data.data.code;
        console.log(this.code);
      });
    },
    // 点击登陆
    infoBtn() {
      this.login = true;
      let _message = this.$message({
        iconClass: "el-icon-loading",
        message: "登陆中请稍等...",
        duration: 15000,
        center: "center",
      });
      postApiPhone({
        iphon: this.iphon,
        code: `${this.code}`,
        phoneCode: this.phoneCode
      }).then(res => {
        this.login = false;
        let { data, code, message } = res;
        if (code === "200") {
          // console.log(this.$router,"111")
          // params会受到重定向（redirect）的影响， login---->Home--->menu1
          // this.$router.push({ name: "home", params: { id: "456" } });
          localStorage.setItem("user", JSON.stringify(data.userInfo));
          this.dialogVisible = true;
          this.userId = data.userInfo.id
        }
        _message.close();
          this.$message({
          message: message,
          type: code === "200" ? "success" : "error",
        });
      });
    }
  },
  // 注册组件
  components: {
    Dialog: Dialog,
  },
  // html挂在后执行（只执行一次）适用于请求数据
  mounted: function() {
    if (localStorage.getItem("user")) {
      //  query不会受到重定向（redirect）的影响， login---->Home?id=456--->menu1?id=456
      this.$router.push({ name: "home" });
    }
  },
};
</script>

<style lang="scss">
#login {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/login/bg.png") no-repeat;
  background-size: cover;
  padding: 79px 100px;
  box-sizing: border-box;
  & > .app_content {
    background: #fff;
    border-radius: 16px;
    display: flex;
    width: 100%;
    height: 100%;
    padding: 100px 60px 22px 30px;
    box-sizing: border-box;
    & > .left {
      flex: 1;
      justify-content: center;
      align-items: center;
      padding-right: 20px;
      & > img {
        width: 100%;
        height: calc(100% - 56px);
        display: block;
      }
    }
    & > .right {
      flex: 1;
      padding: 4px 10px 10px 100px;
      box-sizing: border-box;
      .template {
        width: 500px;
        img {
          width: 160px;
          height: 70px;
          margin-left: 158px;
          display: block;
        }
        .phone,
        .code {
          width: 477px;
          margin-top: 20px;
          .el-input__inner {
            border: 0px solid #fff;
            border-bottom: 1px solid #ddd;
            border-radius: 0px;
          }
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
              .affirm {
                color: #0fbc77;
                cursor: pointer;
              }
              .sendAffirm {
                color: #ccc;
                cursor: not-allowed;
              }
            }
          }
        }

        .login {
          margin-top: 40px;
          width: 477px;
          height: 46px;
          background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%);
          border-radius: 5px;
          color: #fff;
        }
        .login_style{
          opacity: .6;
        }
      }
    }
  }
}

.redio{
  width: 100px;
}
</style>
