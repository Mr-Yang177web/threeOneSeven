<template>
  <div id="login">
    <div class="content">
      <div class="left">
        <img src="../../assets/img/login/loginleft.png" alt="" />
      </div>
      <div class="right">
        <div><img src="../../assets/img/login/mobilelogo.png" alt="" /></div>

        <div class="inp">
          <el-input
            class="phone"
            prefix-icon="el-icon-user"
            placeholder="请输入手机号"
            v-model="phone"
          >
          </el-input>

          <el-input
            class="password"
            prefix-icon="el-icon-lock"
            placeholder="请输入验证码"
            v-model="code"
          >
            <button
              :class="/^1[3456789]\d{9}$/.test(phone) ? 'oksend' : 'send'"
              slot="suffix"
              @click="sendclick"
              :disabled="!(/^1[3456789]\d{9}$/.test(phone) && sss === '发送')"
            >
              {{ sss }}
            </button>
          </el-input>
        </div>
        <div class="btn">
          <el-button
            type="primary"
            @click="login"
            :disabled="!(/^1[3456789]\d{9}$/.test(phone) && code)"
            >登录 / 注册</el-button
          >
        </div>
      </div>
      <Dialog 
      :dialogVisible="dialogVisible"
      :userId="userId"
      v-on:close="dialogVisible = false"
      />
    </div>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog.vue"
import { postcode, postphone } from "../../api/api";
import { _random } from "../../utils/utils";
_random;
export default {
  name: "Login",
  data() {
    return {
      dialogVisible: false,
      phone: "",
      code: "",
      sss: "发送",
      phonecode: "",
      userId:"0"
    };
  },
  components:{
    Dialog:Dialog
  },
  methods: {
    postcode() {
      let phone = this.phone;
      let PhoneCode = this.phonecode;
      postcode({ phone, PhoneCode }).then(() => {
        this.phonecode = this.code;
      });
    },

    sendclick() {
      if (/^1[3456789]\d{9}$/.test(this.phone)) {
        this.code = _random(1000, 9999);
        this.postcode();
        let second = 5;
        let timer = setInterval(() => {
          second--;
          this.sss = second;
          if (second < 1) {
            clearInterval(timer);
            this.sss = "发送";
          }
        }, 1000);
      }
    },
    //登录按钮
    login() {
      let pho = this.phone;
      let cod = this.code;
      let phonecode = this.phonecode;
      let aaa = {
        phone: pho,
        code: cod,
        PhoneCode: phonecode,
      };
      postphone(aaa).then((res) => {
        if (res.data.code === 1) {
          //获取ID
          this.userId=res.data.data.id
          this.dialogVisible = true;
          localStorage.setItem("user", JSON.stringify(res.data));
        }
      });
    },
  },
  //加载渲染完成后
  mounted: function () {
    localStorage.getItem("user")
    // if(){

    // }
  },
};
</script>


<style lang="scss">
#login {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/login/bg.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  .content {
    width: 80%;
    height: 70%;
    background-color: white;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 16px;
    display: flex;
    .left {
      width: 40%;
      height: 100%;
      position: relative;
      img {
        width: 100%;
        height: 70%;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
    .right {
      width: 60%;
      height: 100%;
      position: relative;
      justify-content: center;
      align-items: center;
      img {
        width: 30%;
        height: 15%;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: 50px auto;
      }
      .inp {
        text-align: center;
        margin-top: 200px;
        .phone {
          width: 60%;
        }
        .password {
          margin-top: 20px;
          width: 60%;
          .send {
            line-height: 40px;
          }
          .oksend {
            line-height: 40px;
            color: blue;
          }
        }
      }
    }
    .btn {
      text-align: center;
      margin-top: 20px;
      .el-button {
        width: 60%;
      }
    }
  }
}
</style>
